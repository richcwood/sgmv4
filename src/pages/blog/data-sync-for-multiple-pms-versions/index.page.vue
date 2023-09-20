<template>
  <Article>
    <template #title>
      Don't let PMS upgrades break your data sync
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/data-sync-for-multiple-pms-versions/head-image.png" alt="Head image" />
    </figure>
    <h3>
      Don’t let PMS upgrades break your data sync
    </h3>
    <p>
      See how you can design data sync jobs that stay ahead of practice management software upgrades
    </p>
    <p>
      Desktop Practice Management Software can have several versions in production at customer sites.  
      Popular PMS platforms might have one or two dozen versions running in the wild.
    </p>
    <p>
      That creates a challenge for eServices vendors when there are data structure or architecture differences between PMS versions that break the data sync tool.
    </p>
    <p>
      Often customers upgrade PMS without making sure the new version is compatible with their eServices.  
      By the time they notice something is wrong and call support the PMS and eService data are out of sync.  
      Support will need to take time to discover the software incompatibility, upgrade the data sync tool and resynchronize the data.
    </p>
    <p>
      When you design your data sync tool as a SaaSGlue job you can make sure you always use the right version of your data sync tool, so unannounced PMS upgrades will no longer be a problem.
    </p>
    <h3>
      Create a two-step data sync tool
    </h3>
    <p>
      SaaSGlue has several capabilities that lets software developers create very flexible jobs.
    </p>
    <p>
      <ol>
        <li>
          Using tags to qualify agents to run a job
        </li>
        <li>
          Passing variables into and out of tasks
        </li>
        <li>
          Calling a subsequent job from the current job through the API
        </li>
      </ol>
    </p>
    <p>
      We’ll show you how you can use these three capabilities to create a simple pattern to make sure you always use the right data sync version every time your job runs.
    </p>
    <h3>
      Target jobs to the right PMS using tags
    </h3>
    <p>
      Finding the version number will likely be a different process for each PMS, so you need to create a unique job for each one.  
      Using custom tags you can easily point the right version of the data sync to the right PMS.  
      Your tags might look like these.
    </p>
    <p>
      <b>PMS=Dentrix</b>
    </p>
    <p>
      <b>PMS=Eaglesoft</b>
    </p>
    <br>
    <p>
      Assign the appropriate tag to the agents on your clients’ PMS servers.
    </p>
    <p>
      Now you can use these tags to qualify the agents that will run each version of the data sync tool.  
      Assigning the PMS=Dentrix tag to a job guarantees that only agents with that tag will run the job.
    </p>
    <h3>
      Dynamically find the PMS version number
    </h3>
    <p>
      The first job will be split into two tasks.
    </p>
    <p>
      For each targeted PMS the first task should be designed to find the version number.  
      For some applications might look for a specific file in the application folder, for others you might look for a registry key.  
      However you do it, you need to find the version number and return it as a variable to the second task.
    </p>
    <p>
      The second task will use that variable to determine which version of the data sync tool to run.  
      You could include a table of corresponding PMS versions and data sync jobs as a table in the script file.  
      Or you could store that table as an artifact in the SaaSGlue account and pass it down with the job each time it’s run.
    </p>
    <p>
      Once the correct version of the data sync job has been determined you will execute it by calling it through the API.  
      At the same time you will pass in the name of the agent, because this instance of the job will be targeted to just the one agent where the version number was verified.
    </p>
    <h3>
      Run the right data sync version every time
    </h3>
    <p>
      Prepending your data sync with this simple version discovery process guarantees you will always deploy the correct version of your data sync tool.  
      Unannounced PMS upgrades will no longer be a problem and their support costs will be eliminated.
    </p>
    <p>
      You might have a variety of data sync jobs to serve different cloud features.  
      You can reuse the PMS version discovery job to prepend each of your data sync jobs and eliminate duplicate coding.
    </p>
  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'prismjs/themes/prism.min.css';
import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'patient-reminder-service',
  components: { Article },
  computed: {
    tags (): Tag[] {
      return [Tag.DENTAL_SOFTWARE, Tag.DATA_ENGINEERING, Tag.INTEGRATION];
    }
  }
});
</script>

<style scoped>

.content figure {
  margin-right: 0;
  margin-left: 0;
}

tr {
  border-style: hidden;
}

ol li::first-letter {
  font-weight: bold;
}


</style>
