<template>
  <Article>
    <template #title>
      Support a patient reminder service with SaaSGlue
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    
    <p>
      Create a data sync solution for a patient reminder service with a few simple scripts.
      Nearly all dental practices rely on text reminders to ensure patients will show up for their scheduled visits.
      In this article we’ll show you how you can quickly and easily create a reliable data sync solution to integrate your cloud-based reminder service with <b>dental Practice Management Software (PMS)</b>.
    </p>
    <p>
      The diagram below illustrates the data flow model.  
      It assumes that the practice is using a desktop PMS, but the basic pattern works equally well with a cloud PMS.  
      You will need to establish a connection to the PMS data source.  
      There are a number of ways you can do that which we have detailed in this article: 
      <a href="/blog/connect-to-desktop-software">Connect to desktop software blog post</a>
    </p>
    <p>
      <figure class="image is-fullwidth">
        <img src="@/assets/images/blog/patient-reminder-service/basic_flow.png" alt="Head image" />
      </figure>
    </p>
    <p>
      <h3>Install the agent</h3>
    </p>
    <p>
      For this pattern to work in a desktop environment you first need to install the SaaSGlue agent on the customer’s machine where the PMS data store is located.  
      The agent is a small software utility that takes minutes to download and install.  
      There are agents for Windows, Mac and Linux and the instructions for installing on each of these OSs can be found in the Agent Download tab of your SaaSGlue account page.
    </p>
    <p>
      <h3>Synchronize the PMS schedule to your service cloud</h3>
    </p>
    <p>
      The first job you’ll create will upload all future PMS schedule data to your cloud.  
      After the initial upload you’ll need to update schedule changes on a regular cadence.
    </p>
    <p>
      This job will be triggered in two different ways.  
      The initial upload should occur when a new customer account is created.  
      This should trigger an event in your cloud software that will call the SaaGlue API to trigger the Schedule Upload job.  
      This job will be targeted at a specific agent – the one that’s installed on the new customer's machine where the PMS data source resides.
    </p>
    <p>
      Once the initial upload job is completed you should schedule the job to run at a regular interval during normal business hours.  
      This job can be targeted at a specific agent, but it’s more likely that you’ll use a tag to target the job to a pool of agents – all active subscribers of your service.
    </p>
    <p>
      You can write this as a single script job.  Here's the basic outline of the Schedule Upload job.
    </p>
    <ol>
      <li>Establish a connection to the PMS data source</li>
      <li>Run a query for future scheduled appointments</li>
      <li>Collect the query results and transform them as needed</li>
      <li>Establish a connection to your eServices API</li>
      <li>Upload the transformed query results</li>
    </ol>
    <p>
      You may need several versions of this job to accommodate different PMSs and different versions of a PMS.  
      We’ve written another blog post that describes how you can do that with a dynamically routed SaaSGlue job:
      <a href="/blog/data-sync-for-multiple-pms-versions">Data sync for multipl pms version blog post</a>
    </p>
    <p>
      The initial upload should collect all future scheduled appointments.  
      After the initial upload the job should query only for new and updated appointments.
    </p>
    <p>
      To facilitate finding just the new and updated appointments you may want to store a file with the date/time stamp of the last query on the agent host machine.  
      Use this as the starting point of the new query and compare the date against the create and update date/time stamps in the PMS appointment table.
    </p>
    <p>
      When you upload the results to your eService you will need to make sure each appointment is uniquely associated with the client accounts where it came from.
    </p>
    <p>
      Your eService will send confirmation texts through an SMS gateway to patients’ mobile phones.  
      Alternatively you might send email or messages to a proprietary mobile app, but the principle remains the same.
    </p>
    <p>
      <h3>Upload patient confirmations to the PMS</h3>
    </p>
    <p>
      When a patient returns a confirmation through an SMS response, it will be returned to your cloud service.  
      You can use this to create an event that will trigger the Patient Confirmation SaaSGlue job through the API.  
      At the same time you will pass in the practice ID and appointment ID variables.
    </p>
    <p>
      This job will be targeted at the specific agent which is installed at the practice with the corresponding practice ID.
    </p>
    <p>
      The Patient Confirmation job needs only a single script.
    </p>
    <p>
      <ol>
        <li>Establish a connection to the PMS data source</li>
        <li>Find the correct appointment</li>
        <li>Mark the appointment with the correct response (confirmed, canceled, etc.)</li>
        <li>Establish a connection to the eService API</li>
        <li>Report whether the confirmation was successfully saved</li>
      </ol>
    </p>
    <p>
      <h3>Let SaaSGlue handle the rest</h3>
    </p>
    <p>
      With these few simple jobs you have everything you need to handle the data sync between your cloud service and the PMS.
    </p>
    <p>
      SaaSGlue will execute, monitor and log each job in the cloud and alert you when there’s a problem.
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

/* pre {
  background: #eee;
  padding: 1rem;
  overflow: auto;
  border-radius: 3px;
  max-width: 80ch;
}

code {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
} */

.copy-button {
  margin-bottom: 10px;
}

ol li::first-letter {
  font-weight: bold;
}


</style>
