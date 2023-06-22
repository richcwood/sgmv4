<template>
  <Article>
    <template #title>
      Minimize the cost of your AWS batch data pipelines with serverless and ephemeral compute
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/aws-data-pipelines/head-image.webp" alt="Head image" />
    </figure>
    <p>The most expensive cloud compute is the compute you’re paying for that isn’t doing anything. If you currently 
      manage or are planning to build batch processing data pipelines in AWS you will want to minimize your cloud costs 
      by utilizing serverless and ephemeral compute.</p>
    <p>This article demonstrates how to build a data pipeline that watches for files in an S3 bucket, provisions 
      compute to process the files, processes the files, and automatically terminates the compute after an idle 
      timeout period. All code, configuration and detailed instructions required to reproduce this data pipeline 
      are available in Github <a target="_blank" href="https://github.com/saascipes/file-watcher-data-pipline">here</a>. 
      We are using SaaSGlue to schedule and automate the data pipeline.</p>
    <figure class="image is-16by9">
      <iframe class="has-ratio" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="AWS File Analyzer Demo with SaaSGlue" width="640" height="360"
        src="https://www.youtube.com/embed/TWEh9H3BLAI?wmode=opaque&amp;enablejsapi=1"></iframe>
      <figcaption>Watch the 2 1/2 minute demo video</figcaption>
    </figure>
    <h2>Data pipeline system architecture</h2>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/aws-data-pipelines/img1.webp" alt="SaaSGlue data pipeline system architecture" />
    </figure>
    <ol>
      <li>The SaaSGlue cloud service. We will use the SaaSGlue web console to configure, execute and monitor 
        the data pipeline.</li>
      <li>AWS Lambda. We will execute several steps in the data pipeline in AWS Lambda via the SaaSGlue Agent.</li>
      <li>AWS S3. The input files to be analyzed will be stored in S3.</li>
      <li>AWS EC2. The file processing will be performed via the SaaSGlue Agent using a clojure application 
        on an EC2 instance that is provisioned and terminated as part of the data pipeline.</li>
    </ol>
    <h2>How it works</h2>
    <p>Our data pipeline consists of three jobs:</p>
    <ol>
      <li>File Watcher</li>
      <li>File Analyzer</li>
      <li>Stop Agent and Terminate EC2</li>
    </ol>
    <h2>File Watcher</h2>
    <p>This job consists of four tasks:</p>
    <ol>
      <li>Check for new files. This task runs a nodejs script in AWS Lambda that checks for new files in a 
        specific S3 bucket/prefix. If it finds any files, it outputs a route code of “ok” and creates a 
        runtime variable named “files” with a comma-delimited list of the files found. Otherwise it outputs 
        a route code of “nothing_to_do” in which case the remaining tasks in the job will be skipped.</li>
      <li>Launch analyzer host. This task runs a python script in AWS Lambda that launches a new EC2 instance 
        with a bootstrap script which downloads and starts the SaaSGlue Agent, which will facilitate running 
        the actual file processing.</li>
      <li>API Login. This task runs a python script in AWS Lambda that obtains a jwt token from the SaaSGlue 
        API and passes it to the next task in the job in a runtime variable.</li>
      <li>Create analyze jobs. This task runs a nodejs script in AWS Lambda that creates an instance of the 
        “File Analyzer” job via the SaaSGlue API for each file found in task 1.</li>
    </ol>
    <p>The SaaSGlue service orchestrates the job tasks, ensuring that each task executes in order. We utilize conditional routing to stop 
      the job after the first task if no files are found. Notice the route code “ok” of the inbound route from “Check for new files” to 
      “Launch analyzer host”.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/aws-data-pipelines/img2.webp" alt="Task routes" />
    </figure>
    <p>And a snippet of the “Check for new files” script.</p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/aws-data-pipelines/img3.webp" alt="Code snippet" />
    </figure>
    <p>Notice that if there is more than one file (list.length > 0), a runtime variable named “route” is created 
      with the value “ok”. This is done with a simple SaaSGlue construct that can be used in scripts in any 
      language, “@sgo{“variable_name”: “variable_value”}”. By printing this string to stdout, we are telling 
      the SaaSGlue service the route code to use to determine the path of the workflow subsequent to this task.</p>
    <h2>File Analyzer</h2>
    <p>This job consists of one task named “Analyze file” with two steps. A SaaSGlue task consists of one or more 
      steps that all run in the same runtime environment. In this case, these steps will run on the new EC2 instance 
      that was created in the File Watcher job, Launch analyzer host task.</p>
    <ol>
      <li>download file. This step runs a shell script which downloads the file to be processed to the runtime 
        environment. For demo purposes the file is not deleted or moved. In production you would want to move the 
        file after downloading.</li>
      <li>analyze file. This step runs a function in a java jar file compiled from Clojure which counts the words 
        in a file and sends the results to stdout. The jar file is uploaded to SaaSGlue as an artifact and attached 
        to the Analyze file task. At runtime the file is automatically downloaded to the runtime environment.</li>
    </ol>
    <h2>Stop Agent and Terminate EC2</h2>
    <p>This job is launched from the SaaSGlue Agent running on the new EC2 instance after a configurable period of 
      time without running any tasks. 
      It consists of three tasks:</p>
    <ol>
      <li>API Login. This task re-uses the script used by the task with the same name in the first job. It also runs 
        in AWS Lambda.</li>
      <li>Get ec2 inst id and region. This task dynamically targets the new EC2 instance and gets the EC2 instance id 
        and region. These data 
        are passed to the next task via runtime variables.</li>
      <li>Terminate agent. This task runs a nodejs script which stops the SaaSGlue Agent and terminates the EC2 host 
        instance.</li>
    </ol>
    <h2>Conclusion</h2>
    <p>With the use of serverless compute via AWS Lambda and ephemeral EC2 instances we are only paying for the compute 
      required to process the data. This implementation could be enhanced to handle heavier workloads by scaling up EC2 
      instances to handle increasing loads while allowing each EC2 worker host to scale down when idle.</p>
    <p>In this example we are simply counting the instances of each word in an input file but we could just as easily 
      have spun up an EMR cluster and executed a Spark job (see 
      <a target="_blank" href="how-to-build-a-twitter-trends-analyzer-with-saasglue/">How to build a twitter analyzer 
        with a hybrid cloud data pipeline and a single page web app.</a>) for an example showing how to execute a Spark 
        job as a SaaSGlue task). In fact we could orchestrate any number of dependent and parallel tasks involving 
        resource allocation and processing using the SaaSGlue platform.</p>
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
      return [Tag.AUTO_SOFT, Tag.DATA_PIPELINE, Tag.CLOUD_COST_MANAGEMENT, Tag.SERVERLESS_ARCHITECTURE];
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
