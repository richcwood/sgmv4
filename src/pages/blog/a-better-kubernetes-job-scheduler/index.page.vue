<template>
  <Article>
    <template #title>
      A Better Kubernetes Job Scheduler
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/kubernetes-job-scheduler/head-image.webp" alt="Head image" />
    </figure>
    <p>Kubernetes Jobs are ideal for applications that are intended to perform some task and then shut down, as opposed 
      to service type applications that run continuously. Examples include batch processes in data pipelines and 
      machine learning tasks like model training and batch inference. A Kubernetes Job is really a controller that 
      creates one or more Pods to perform a specific task. It ensures that n Pods successfully terminate, after which 
      the Job and any Pods it created are deleted.</p>

    <h2>Why not CronJobs?</h2>
    <p>Kubernetes CronJobs can be used to create Jobs on a repeating cron type schedule. CronJobs may work for simple 
      use cases but are not ideal for many scenarios due to limited features and idiosyncrasies including:</p>
    <ul>
      <li>In some cases a scheduled CronJob might create multiple or no Jobs.</li>
      <li>The timezone used to determine scheduled execution times is based solely on the timezone of the 
        kube-controller-manager.</li>
      <li>Advanced scheduling features including start/end dates, jitter and interval based and single execution 
        schedules are not supported.</li>
      <li>Parallelization options for Job instances are limited as is controlling what happens when scheduled Jobs 
        fail to execute at the scheduled time.</li>
      <li>Multiple Jobs cannot be chained together in a workflow.</li>
    </ul>
    <h2>Scheduling Kubernetes Jobs with SaaSGlue</h2>
    <p>SaaSGlue simplifies scheduling and running containerized applications as Kubernetes Jobs. After setting up a 
      SaaSGlue account and installing the SaaSGlue Helm chart, scheduling a Job requires a few mouse 
      clicks and entering the docker image name and other Job parameters in the SaaSGlue console.</p>
    <p>This article demonstrates this process using a sample application. To run the sample application you’ll need a 
      SaaSGlue account. If you don’t have one already, 
      <a target="_blank" href="https://console.saasglue.com/">sign up</a> for a free account with your email address 
      or your Google or GitHub credentials.</p>
    <p>Next follow the instructions in the 
      <a target="_blank" href="https://github.com/saascipes/kubernetes-job-runner/">kubernetes-job-runner</a> GitHub 
      repo to configure SaaSGlue to run Kubernetes Jobs and then to run two simple python scripts as Kubernetes Jobs 
      and view the running output in the SaaSGlue console.</p>
    <p>The instructions show how to import the “Kubernetes Job Runner” job to your SaaSGlue account. After importing
      the Job, you can view and modify it in the SaaSGlue console.
    </p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img1.webp" alt="Kubernetes Job Runner Screenshot" />
      </figure>
    </div>
    <p>This job has a single task “Run Job” which creates a Kubernetes Job via the Kubernetes API. It has two schedules 
      which run the two applications every minute.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img2.webp" alt="Kubernetes Job Runner Schedules Screenshot" />
      </figure>
    </div>
    <p>By clicking the “edit” link, you can view and modify the schedule’s properties including the “Runtime Variables” 
      property which is a list of key value pairs used by the running job. The “Kubernetes Job Runner” job utilizes a 
      yaml formatted runtime variable named FunctionKwargs to specify the docker image to use and other Kubernetes Jobs 
      parameters. This design enables reuse of this job to schedule any number of Kubernetes Jobs. See the GitHub repo 
      <a target="_blank" href="https://github.com/saascipes/kubernetes-job-runner/tree/main">readme</a> for a detailed 
      description of the available parameters.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img3.webp" alt="Kubernetes Job Runner Edit Schedule Screenshot" />
      </figure>
    </div>
    <p>FunctionKwargs variable value:</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img4.webp" alt="Kubernetes Job Schedule Variable Screenshot" />
      </figure>
    </div>
    <h2>How it works</h2>
    <p>SaaSGlue is a cloud/agent code scheduling and execution platform. Jobs are created using the SaaSGlue web console 
      or the API and executed by agents deployed to the execution environment. You can easily install the SaaSGlue agent 
      in a Kubernetes cluster using the SaaSGlue helm repo.</p>
    <p>When a schedule is triggered, the SaaSGlue cloud service sends a message to the appropriate agent via a message 
      queue with instructions for creating the Kubernetes Job. The agent then creates the Job using the Kubernetes 
      API.</p>
    <p>The Monitor tab in the SaaSGlue console displays status updates in real-time from start to completion as the Job 
      executes. Historical logs are also available in the Monitor.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img5.webp" alt="Kubernetes Job Monitor Screenshot" />
      </figure>
    </div>
    <p>The running stdout tail is shown in the main view and pop-up links are available to see the full script, stdout 
      and stderr.</p>
    <div class="has-text-centered">
      <figure class="image is-inline-block my-5" style="width:90%">
        <img src="@/assets/images/blog/kubernetes-job-scheduler/img6.webp" alt="Kubernetes Job Monitor Stdout Screenshot" />
      </figure>
    </div>
    <h2>Additional Features</h2>
    <p>SaaSGlue includes many powerful job scheduling features beyond those demonstrated in the sample application.</p>
    <ul>
      <li>Start/end dates, jitter and the time zone to use.</li>
      <li>Interval, cron and single execution schedules.</li>
      <li>Limit the number of instances of a job that can run in parallel.</li>
      <li>Optionally coalesce multiple queued job instances.</li>
      <li>Set the “misfire grace time” to skip the scheduled execution if more than the specified period of time has 
        passed since the scheduled time.</li>
      <li>Pause future job creation if an instance of the job fails.</li>
      <li>Send slack/email alerts on job completion/failure.</li>
      <li>Chain multiple tasks together in a workflow with outcome based routing. Workflow tasks can run in any 
        environment, not just Kubernetes.</li>
      <li>Export/import job definitions.</li>
      <li>The scripts that actually create the Kubernetes Jobs are imported with the “Kubernetes Job Runner” job and 
        are completely customizable for specific use cases so you can leverage the full Kubernetes API unlike no/low 
        code solutions like Argo CD.</li>
    </ul>
    <p>For full details check out the <a target="_blank" href="/docs">documentation</a>.</p>
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
      return [Tag.KUBERNETES, Tag.CRONJOB, Tag.AUTO_SOFT, Tag.SAAS, Tag.LOW_CODE];
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
