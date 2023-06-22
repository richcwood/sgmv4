<template>
  <Article>
    <template #title>
      Scale your streaming data pipelines efficiently with Kubernetes — Part 2
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>
    <p>Demonstrates an implementation of a system architecture for streaming data pipelines that scales automatically 
      while minimizing compute costs using SaaSGlue.</p>
    <h2>Introduction</h2>
    <p><a href="/blog/scale-your-streaming-data-pipelines-with-kubernetes-part1">Part 1</a> of this article described 
      an architectural pattern for efficiently scaling variable rate workloads with Kubernetes. Part 2 provides an 
      implementation of that pattern. It is not meant to be overly proscriptive as specific environment and workload 
      characteristics may dictate alternate implementation details.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block" style="width:40%">
        <img src="@/assets/images/blog/scale-data-pipelines-part2/img1.webp" alt="Data Pipeline Diagram" />
      </figure>
    </div>
    <p>All code described in this article is available in Github 
      <a target="_blank" href="https://github.com/saascipes/k8s-auto-scaler">here</a>. This repo also includes helm 
      charts and scripts to install, run and monitor the demo application in your Kubernetes environment.</p>
    <h2>Environment</h2>
    <p>The demo application will run in any Kubernetes environment including Docker Desktop. To get the full benefits 
      of auto scaling, production implementations should be deployed on auto scaling or “Managed” node groups such as 
      those offered by Amazon AWS EKS and Google GKE.</p>
    <p>In addition to Kubernetes itself, this solution utilizes the following tools:</p>
    <ul>
      <li>Kubernetes Python API</li>
      <li>Python 3</li>
      <li>RabbitMQ</li>
    </ul>
    <h2>The Solution</h2>
    <p>There are three main applications in this solution:</p>
    <ol>
      <li>Message Publisher (rmq_pub.py) — publishes work items to the message queue.</li>
      <li>Worker Scaler (worker_scaler.py) — scales up Workers in response to a trigger event.</li>
      <li>Workers (worker.py)—each Worker instance processes messages from a message queue until the queue is empty 
        and then shuts down.</li>
    </ol>
    <h2>Message Publisher</h2>
    <p>The Message Publisher publishes work items to the message queue.</p>
    <h2>Worker Scaler</h2>
    <p>The Worker Scaler checks the message queue size at regular intervals. A scale up event is triggered if 1) the 
      number of messages in the queue exceeds a threshold or 2) a message has been in the queue for more than a fixed 
      period of time. This solution reduces node churn while ensuring that maximum latency requirements are met. 
      Depending on workload characteristics and processing SLAs, it may be more efficient to leave a minimum number of 
      nodes running rather than scaling down to 0.</p>
    <p>Workers are scaled up by creating a Job to host each additional Worker via the Kubernetes API. If the node group 
      where a Job is deployed has sufficient capacity, the Job should start relatively quickly. Otherwise a new node 
      will be provisioned and the Worker docker image downloaded to the node. This could take several minutes or longer. 
      To avoid attempting to create additional Workers during this provisioning process the Worker Scaler will 
      periodically check the status of the new Job via the Kubernetes API until it is ready before continuing to scale 
      up.</p>
    <p>The Worker Scaler should scale up until the queue size drops below the threshold or the node group reaches 
      capacity. Kubernetes provides multiple ways to constrain capacity of individual nodes, and node groups are 
      limited to a maximum number of nodes. When all nodes are utilized at capacity and no new nodes can be provisioned, 
      the Worker Scaler will wait until capacity is available before creating new Workers.</p>
    <p>How many Workers should be created when a scale up event is triggered? That depends on how the node group scales 
      since Workers cannot scale faster than the target node group. Since EKS/GKE Managed node groups scale linearly, 
      one node at a time, Workers will scale accordingly. This will result in a pattern of scaling fairly quickly until 
      the cluster is fully utilized followed by a potentially long pause while a new node is provisioned. For faster 
      scaling, we could over provision the cluster, as described in this 
      <a target="_blank" href="https://medium.com/scout24-engineering/cluster-overprovisiong-in-kubernetes-79433cb3ed0e">article</a>, 
      or create multiple Managed node groups and scale them independently.</p>
    <h2>Workers</h2>
    <p>Workers process messages in a queue until the queue is empty and then shut down after a period of inactivity.</p>
    <p>When Workers start up they subscribe to the queue and begin receiving messages. Queued messages in RabbitMQ are 
      either Ready or Unacked. To ensure that each message in the queue is processed, Workers do not acknowledge 
      messages until after they are processed. This leaves messages in the Unacked state while being processed. If a 
      Worker crashes while processing a message, it will automatically be reset to Ready and picked up by the next 
      available Worker.</p>
    <p>One implication of this strategy is that message processing logic should be idempotent, so that if a message is 
      partially processed by one Worker and then processed by another Worker, the result is the same as if it was fully 
      processed by the first Worker.</p>
    <h2>The Demo</h2>
    <p>The <a target="_blank" href="https://github.com/saascipes/k8s-auto-scaler">demo code</a> includes a fully 
      functional demo of the Message Publisher, Worker Scaler and Worker applications. See the README file in the code 
      repo for complete instructions for installing, running and monitoring the demo.</p>
    <p>The ./bin/install.sh script will create and configure a RabbitMQ stateful set and a pod running the Worker Scaler 
      application in your Kubernetes cluster. It will also create a service account for the Worker Scaler and the 
      necessary Role and RoleBinding to authorize the service account to call the Kubernetes API.</p>
    <p>Next run the ./bin/publish_messages.sh script to publish 200 messages to RabbitMQ. The Worker Scaler will then 
      create new Workers at 10 second intervals until the queue size drops below the threshold. Workers will “process” 
      the messages using a simple time delay. After all messages are processed each Worker will automatically 
      terminate.</p>
    <p>Instructions are provided for connecting to the RabbitMQ web monitor and for viewing the Worker Scaler and Worker 
      logs in the README file.</p>
  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'scale-your-streaming-data-pipelines-with-kubernetes-part2',
  components: { Article },

  computed: {
    tags (): Tag[] {
      return [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE,
    Tag.RABBITMQ];
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
