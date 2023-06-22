<template>
  <Article>
    <template #title>
      Time for a Change: Manage and Monitor Your Cron Jobs in the Cloud with
      SaaSGlue
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/cron-jobs-with-sg/head-image.webp" alt="Head image" />
    </figure>
    <p>This article will demonstrate how to import your Cron jobs to <a target="_blank" href="/solutions/cron">SaaSGlue</a>
      in five minutes or less. To see how it works in action, watch the 2 1/2 minute demo video at the end of this
      article.</p>
    <h2>Cron is great, until it's not</h2>
    <p>If you're using Cron to schedule recurring tasks like backups, updates, data processing and running reports
      you've likely experienced the limitations of Cron. Cron is free and fairly simple to use and works well for
      certain tasks. However, Cron based solutions for non-trivial scheduling tasks can result in solutions that are
      complex, brittle and expensive to maintain.</p>
    <p>It's simple enough at first to schedule a task. But soon you'll want to have central logging to increase
      visibility. Then alerts for when something goes wrong. You might need to handle concurrency or dependencies
      between Cron jobs. Each new layer of scaffolding increases the complexity and cost of the solution. And
      eventually
      you may need functionality that is beyond the scope of what is practical with Cron, like event based triggers
      and
      multi-machine solutions to achieve scale and resilience.</p>
    <h2>A better solution: Software automation as a service</h2>
    <p>SaaSGlue is a software automation service that performs the same basic functions as Cron plus central
      management,
      logging/alerting, multi-task workflows, automatic failover and much more. In this article, we will demonstrate
      how
      to import your existing Cron jobs to SaaSGlue, allowing you to manage and monitor your automated tasks in one
      central location.</p>
    <p>There are two main components to SaaSGlue — the SaaSGlue service and the SaaSGlue agent. After installing the
      agent on a machine, you can upload the Cron jobs on that machine to SaaSGlue. SaaSGlue will then execute the
      jobs
      according to the schedule via the SaaSGlue agent. You can view your running jobs, recent job history and
      upcoming
      jobs in the dashboard.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/cron-jobs-with-sg/gif1.gif" alt="Cron jobs with SaaSGlue" />
    </figure>
    <p>Unlike many software automation solutions SaaSGlue does not require installing and configuring a server. To
      import your Cron jobs to SaaSGlue you simply sign up for a free account, download and install the secure,
      lightweight agent and then click the “Import” button next to the host machine name on the Agents tab of the
      cloud
      console. That's all there is to it. SaaSGlue will execute your Cron jobs just like before, only now you can
      monitor and manage them all in one place.</p>
    <hr />
    <h2>Import your Cron jobs in 3 steps</h2>
    <h3>Step 1: Sign up for a free account</h3>
    <p><a target="_blank" href="https://console.saasglue.com/">Sign up</a> for a free account and log into the SaaSGlue 
      web console. You can sign up with your Google or Github account or with your email address. There is no payment 
      option required to sign up and your first 1,000 scripts are free.</p>
    <h3>Step 2: Download and install the SaaSGlue agent</h3>
    <p>SaaSGlue runs your Cron jobs via an agent which can be installed on Linux, Mac or Windows machines. Before
      installing the agent you'll need to generate a revokable, secure access key in the web console which is used to
      securely connect to the SaaSGlue service over https. There are no incoming connections to the agent, so no
      firewall configuration is required.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/cron-jobs-with-sg/gif2.gif" alt="Access key creation" />
    </figure>
    <p>Now follow the instructions on the “Download Agent” tab of the web console to download and install the agent.
      After installing the agent you'll see your machine in the Agent tab of the console.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/cron-jobs-with-sg/img1.webp" alt="Active agents list" />
    </figure>
    <h3>Step 3: Import your Cron jobs</h3>
    <p>After clicking the “Import” button next to your machine name, a dialog box will show the Cron jobs currently
      running on the host machine. Each Cron job will have an “Import” button next to it. As each Cron job is
      imported, a new tab will open with the imported job. You can then modify the schedule and other job parameters. 
      Remember to delete or disable the Cron jobs on the host machine to avoid duplicate job executions.</p>
    <p>Watch the video for a 2 1/2 minute demo and explanation of these steps.</p>
    <figure class="image is-16by9">
      <iframe class="has-ratio" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="SaaSGlue Cron Import Demo" width="640" height="360"
        src="https://www.youtube.com/embed/QpH_y-CevNo?wmode=opaque&amp;enablejsapi=1"></iframe>
      <figcaption>Watch the 2 1/2 minute demo video</figcaption>
    </figure>
  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'time-for-a-change-manage-and-monitor-your-cron-jobs-in-the-cloud-with-saasglue',
  components: { Article },

  computed: {
    tags (): Tag[] {
      return [Tag.CRON, Tag.SOFT_DEV, Tag.AUTO_SOFT, Tag.SAAS, Tag.SAAS_TOOLS];
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
