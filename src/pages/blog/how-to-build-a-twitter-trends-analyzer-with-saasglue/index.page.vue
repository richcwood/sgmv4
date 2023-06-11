<template>
  <Article>
    <template #title>
      Build a twitter analyzer with a hybrid cloud data pipeline and a single page web app
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/twitter-analyzer/head-image.webp" alt="Head image" />
    </figure>
    <p>This article describes how to build a “what’s trending on twitter” single page web app with a hybrid cloud data 
      pipeline powered by <a href="https://saasglue.com/">SaaSGlue</a>.</p>
    <h2>Introduction</h2>
    <p>Learn how to build a data pipeline that creates batches of streaming tweets, analyzes a moving window of tweet 
      batches and extracts the most significant topics and then displays them using a modern single page web application. 
      All of the code, configuration files and instructions required to reproduce this data pipeline and web app are 
      available in Github <a href="https://github.com/saascipes/twitter-data-pipeline">here</a>.</p>
    <p>The web app looks like this:</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/twitter-analyzer/img1.webp" alt="Trending on Twitter" />
    </figure>
    <p>It shows the top 5 trending topics on Twitter related to one or more filter rules. Each “topic” is a list of 
      keywords ranked by significance and generated using LDA Natural Language processing and other text analysis 
      data science techniques. Users can change the filter rules and then click the “Reset” button to remove the 
      existing topics and launch the data pipeline to regenerate the trending topics for the new rules. Clicking 
      “Stream” will automatically run the data pipeline at one minute intervals for the next ten minutes. Other 
      schedules can be created using the SaaSGlue web console.</p>
    <h2>Components</h2>
    <ul>
      <li>API: implemented with NodeJS Express and TypeScript. Exposes functionality for retrieving/modifying Twitter 
        filter rules and for running and scheduling the data pipeline.</li>
      <li>Web app client: implemented with VueJS (class style) and TypeScript. Implements browser push technology using 
        StompJS to connect to RabbitMQ to receive trending topics updates. This allows the web app to update with no 
        page reloads.</li>
      <li>Spark cluster: the GitHub repo includes the docker files and docker-compose file required to build the docker 
        images and deploy the cluster.</li>
      <li>LDA/Lemmitization Scala code: this code extracts the topics from the aggregated tweets files. Compiles to a Java 
        jar file and runs in the Spark cluster.</li>
      <li><a href="https://saasglue.com/">SaaSGlue</a> automation platform: a SaaS based service that schedules and 
        orchestrates the data pipeline. You can sign up for a free to use account in a minute or two and the first 
        1,000 script executions are free. You can easily import this data pipeline into your SaaSGlue team environment. 
        For details see the Github <a href="https://github.com/saascipes/twitter-data-pipeline">repo</a> README.</li>
    </ul>
    <h2>How the data pipeline works</h2>
    <p>The Twitter stream data pipeline is implemented as a SaaSGlue job. It can run on a schedule or it can be started 
      manually using the SaaSGlue web console or the SaaSGlue API. A job consists of a DAG that defines the tasks in the 
      pipeline and the routes that determine the pipeline flow. Each task consists of one or more steps, each with an 
      associated script.</p>
    <p>When SaaSGlue executes a task, it sends the code and metadata required to run the task to the SaaSGlue agent, 
      which then executes the task steps locally. Tasks can also be executed without an agent as an AWS Lambda function 
      in a SaaSGlue managed AWS environment.</p>
    <p>There are two tasks in this data pipeline. The first runs in AWS Lambda. It captures a stream of tweets and 
      uploads them to AWS S3. The second runs on the master node of a Spark cluster. It extracts the five main topics 
      from the captured tweets and pushes them to RabbitMQ.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/twitter-analyzer/img2.webp" alt="Data Pipeline" />
    </figure>
    <ol>
      <li>SaaSGlue delivers code and metadata to a special SaaSGlue agent which will create an AWS Lambda function using 
        the script code, register the function with AWS Lambda, execute it, tail the associated CloudWatch log and 
        stream the output back to the SaaSGlue API for viewing in the SaaSGlue web console monitor.</li>
      <li>A javascript function captures tweets using the Twitter stream API until it reaches a max number of tweets or 
        a timeout period.</li>
      <li>If any tweets were captured they are serialized to a file and uploaded to an AWS S3 bucket.</li>
      <li>SaaSGlue delivers code and metadata to an agent running on the master node of a Spark cluster.</li>
      <li>The agent runs a javascript script which deletes any tweets outside of the moving window timeframe from the 
        local tweets storage location.</li>
      <li>The agent runs a shell script which downloads the tweet file uploaded to S3 in step 3 to a local path. The 
        path to the tweet file in S3 is passed to this task from the first task as metadata.</li>
      <li>The agent runs a shell script which starts the Spark job which analyzes the aggregate tweets and saves the 
        results to a local file.</li>
      <li>The agent runs a python script which extracts the topics from the local file and pushes them to RabbitMQ.</li>
      <li>RabbitMQ delivers the updated topics to the web client which updates the view.</li>
    </ol>
    <h2>What’s different about it?</h2>
    <p>Most data pipeline orchestration solutions are server based. Popular examples include Airflow, Ansible and 
      Jenkins. This design limits the reach of the data pipeline to the network where the server is located. It is 
      possible, but not ideal, to open network firewalls to broaden the reach of a server based solution. In addition 
      to security concerns, executing code remotely across networks introduces the risk of orphaned or failed processes 
      due to network hiccups. Additionally, since pipeline workers are often tightly coupled to the server application, 
      provisioning resources to run pipeline tasks can be challenging.</p>
    <p>SaaSGlue’s basic design is different in one critical way — SaaSGlue decouples job orchestration from task 
      execution. Jobs are orchestrated by the SaaSGlue API and job tasks are executed locally by the SaaSGlue agent.</p>
    <p>This may appear to be a minor architectural difference but the implications are wide reaching.</p>
    <ol>
      <li>Since it is a SaaS service, there is no server to provision and set up and no plugins to configure. You can 
        literally execute your first SaaSGlue job in minutes after signing up for an account.</li>
      <li>No firewall exceptions. Rather than reaching into the host machine and executing code remotely, the API sends 
        task instructions to agents via a message queue. The agent communicates running task status and metadata to the 
        API over https. Consequently, the only connectivity required by the agent is outbound https.</li>
      <li>Adding a new compute resource to your data pipeline is as easy as running the SaaSGlue agent on the new 
        machine.</li>
      <li>Suitable tasks can be executed in AWS Lambda without installing an agent and without provisioning an AWS 
        account or creating and registering a Lambda function.</li>
      <li>Tasks can run code in any language. Since the agent simply hands code execution off to a local interpreter, 
        you can execute scripts or compiled code in any language supported by the host machine.</li>
      <li>SaaSGlue data pipelines can reach across hybrid and multi-cloud environments.</li>
    </ol>
    <h2>Summary</h2>
    <p>In this data pipeline, we execute a javascript function in AWS Lambda which accesses the Twitter stream API, 
      collects tweets and saves them to AWS S3. Then we run a series of javascript, shell and python scripts on the 
      master node of a local Spark cluster to delete stale tweets, download the recently captured tweets, run a Spark 
      job to extract the most significant topics and push them to RabbitMQ. The only difficult part about creating this 
      data pipeline is writing the code. SaaSGlue makes the orchestration and execution aspects simple.</p>
    <p>For more detailed information and documentation, please visit <a href="https://saasglue.com">saasglue.com</a>.</p>
  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'how-to-build-a-twitter-trends-analyzer-with-saasglue',
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
