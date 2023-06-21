<template>
  <Article>
    <template #title>
      Scale your streaming data pipelines efficiently with Kubernetes — Part 1
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>
    <p>A system architecture for streaming data pipelines that scales automatically while minimizing compute costs.</p>
    <h2>Introduction</h2>
    <p>This article describes an architectural pattern for handling variable rate workloads with Kubernetes. 
      <a href="https://medium.com/@rich_81505/scale-your-streaming-data-pipelines-efficiently-with-kubernetes-part-2-3e2bc8889eac">Part 2</a> 
      provides a detailed implementation of this pattern including demo code.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block" style="width:40%">
        <img src="@/assets/images/blog/scale-data-pipelines-part1/img1.webp" alt="Data Pipeline Diagram" />
      </figure>
    </div>
    <p>This architecture is suitable for streaming data pipelines and parallelized batch processing, and particularly 
      well-suited for volatile workloads with longer task durations.</p>
    <h2>The problem with Kubernetes Deployments</h2>
    <p>Applications deployed as Kubernetes Deployments (or StatefulSets) can be scaled manually or automatically either 
      through the API or with the HorizontalPodAutoscaler (HPA). This can be a great solution for scaling relatively 
      steady workloads with short-lived task durations, such as a REST API backing a web application.</p>
    <p>With volatile workloads, back pressure can become a problem. If volume increases faster than resources can scale 
      up, requests will time out.</p>
    <p>For tasks with durations longer than a few seconds, scaling down can be problematic. Kubernetes does not 
      distinguish between active and idle pods when scaling down. If it chooses to scale down a pod that is processing 
      a long running task, either the task will be killed or idle pods will be kept running while waiting for the long 
      running task to complete. This can be costly in cloud computing environments.</p>
    <p>When searching for a solution to this problem, most of what I found involved attempts to coerce the Kubernetes 
      API to keep or eliminate specific pods when scaling down. My own implementations of this type of solution were 
      overly complex and prone to race conditions and inefficiencies.</p>
    <h2>The solution: decouple scaling up and scaling down</h2>
    <p>The core concept of this solution is to decouple scaling up and scaling down. Scaling up is performed by a 
      lightweight custom application. Scaling down is performed by the application instances themselves when they run 
      out of tasks.</p>
    <hr />
    <p>How does it work?</p>
    <h2>Use Message Queues to deliver tasks to application instances</h2>
    <p>Instead of submitting tasks directly to an application pool deployed as a Kubernetes service, each task is 
      published to a message queue. Application instances then receive tasks by subscribing to the message queue. 
      I’d recommend RabbitMQ but other message queue services offer similar functionality.</p>
    <p>Using message queues offers several benefits in this architecture:</p>
    <ul>
      <li>Back pressure — excess workload volume will accumulate in a queue while resources scale up.</li>
      <li>Fault tolerance — failed messages can be automatically requeued. Dead letter queues can be configured to 
        handle exception scenarios.</li>
      <li>Load balancing — work can be distributed across multiple application instances.</li>
      <li>Monitoring — monitor system health and tune your scaling logic.</li>
      <li>API — most message brokers including RabbitMQ offer an API which provides queue counts. This information can 
        be used to trigger a scale up event.</li>
    </ul>
    <h2>Use Kubernetes Jobs to host your application instances</h2>
    <p>Kubernetes Jobs are intended to host applications that perform a specific task and then shut down. In this case, 
      application instances process messages in a queue until the queue is empty and then exit after a period of 
      inactivity. When the application process exits Kubernetes automatically terminates the host pod.</p>
    <p>Applications scale horizontally simply by creating more Jobs. Each application instance subscribes to the message 
      queue which load balances the work across all available application instances.</p>
    <p>Where possible, Jobs hosting data pipeline applications should be configured to run on auto scaling node groups 
      to minimize compute costs. Both AWS and GCP offer Kubernetes environments with auto scaling node groups that scale 
      down to and up from 0 nodes.</p>
    <h2>How scaling up works</h2>
    <p>Additional application instances are created via the Kubernetes API in response to a trigger event. This is 
      similar to how the Kubernetes HPA works, but the HPA doesn’t offer one-way scaling or scaling with Jobs.</p>
    <p>Another problem with using the HPA in this architecture is that by default, the HPA makes scaling decisions 
      based on resource usage. As noted earlier, the use of message queues shifts back pressure from application 
      instances to the message queue. Consequently resource usage may stay in a normal band even with a large task 
      backlog.</p>
    <p>A better way to trigger scaling up in this architecture is by monitoring the size of the message queue. Not only 
      is this a good indicator that more resources are needed, it can help determine how aggressively to scale up. 
      Part 2 of this article will describe an implementation of this logic in detail.</p>
    <p>I should note that it is possible to configure the HPA to scale based on external metrics including message 
      queue size but for this use case the HPA scaling algorithm is inefficient and unreliable unless application 
      instances process tasks at a fixed rate. The other HPA limitations cited previously also apply.</p>
    <h2>Putting it all together</h2>
    <p>Let’s walk through how a work item gets processed step by step.</p>
    <ol>
      <li>A work item is created</li>
      <li>The item is published to the message queue</li>
      <li>The auto scaler application notices one item in the queue — we’ll assume the auto scaler is configured to 
        scale up with a queue size > 0</li>
      <li>The auto scaler queries the Kubernetes API to see how many application instance Jobs are running and sees 
        there are none currently running</li>
      <li>The auto scaler creates an application instance Job via the Kubernetes API</li>
      <li>The application instance starts and subscribes to the message queue</li>
      <li>The application instance receives the message and performs the task</li>
      <li>After a timeout period the application instance terminates itself</li>
      <li>Kubernetes notices the application instance has stopped and it terminates the Job and the pod on which it was 
        running</li>    
    </ol>
    <p><a href="https://medium.com/@rich_81505/scale-your-streaming-data-pipelines-efficiently-with-kubernetes-part-2-3e2bc8889eac">Part 2</a> 
      of this article provides a detailed implementation of this pattern. It includes python code for scaling up a queue 
      worker application and the queue worker logic that terminates the application instance after a period of 
      inactivity.</p>
  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'scale-your-streaming-data-pipelines-with-kubernetes-part1',
  components: { Article },

  computed: {
    tags (): Tag[] {
      return [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE];
    }
  }
});
</script>

<style scoped>
.content figure {
  margin-right: 0;
  margin-left: 0;
}
</style>
