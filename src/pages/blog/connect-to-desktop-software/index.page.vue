<template>
  <Article>
    <template #title>
      How to connect to desktop software in a SaaSGlue job
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/connect-to-desktop-software/head-image.png" alt="Head image" />
    </figure>
    <p>
      SaaSGlue is a cloud-based lightweight job orchestration service that manages workflows and data flows through hybrid cloud, multi-network environments.  
      But it doesn’t come with any connectors for the data sources or applications that are included in your jobs.  
      This might seem confusing, so we put together this blog article to explain how it works.
    </p>
    <p>
      Many of your assumptions probably come from other systems you’ve used in the past.  
      There are many systems that manage job flows.  
      They might manage what are called Directed Acyclic Graphs (DAG), data pipelines, build pipelines, scripted workflows or something similar.  
      While the specifics of each type of job are different, the systems all do the same basic thing – manage automated, multi-step jobs that execute commands across disconnected systems.
    </p>
    <p>
      The traditional model looks something like this.
      <p>
        <figure class="image is-fullwidth">
          <img src="@/assets/images/blog/connect-to-desktop-software/figure1.png" />
        </figure>
      </p>
    </p>
    <p>
      In this model the agent requires its own server to execute job code and works through some type of plugin connectors to interact with outside systems.
    </p>
    <p>
      The SaaSGlue model is very different.
    </p>
    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/connect-to-desktop-software/figure2.png" />
    </figure>
    <p>
      The SaaSGlue agent is a small software utility that passes code to the host machine for execution.  
      It doesn’t need connectors to interact with outside systems because it’s designed to be installed on the machine where the target system is running.
    </p>
    <p>
      In the SaaSGlue model the developer must create the connection to the data source.  
      The best way to learn how it works is to ask yourself, “how would I interact with the target system if I were logged on at the command prompt of the machine where it’s running?”  
      If you could run shell commands or script files on that machine, how would you manipulate the target system?  
      Here are some suggestions.
    </p>
    <h3>
      Application Programming Interface
    </h3>
    <p>
      Many applications have their own APIs.  
      Writing scripts to connect to the endpoints provides an easy way to query data, pass in data or execute commands.
    </p>
    <h3>
      Command Line Interface
    </h3>
    <p>
      CLIs provide another convenient access method that allows you to enter commands at a prompt and receive a standard output response.
    </p>
    <h3>
      Direct Database Access
    </h3>
    <p>
      Some applications have an open database that can be independently queried outside of the application.  
      Most often they’re protected by a password, which you must know to access the tables.
    </p>
    <p>
      SQL type databases can be queried through an ODBC driver.  
      Connecting with an SQL analyzer will let you see the structure of the database and make it easier to find what you’re looking for.
    </p>
    <p>
      Older flat file databases take a little bit more effort to explore but with some effort you can still find what you need.
    </p>
    <p>
      Directly accessing an applications database is a great way to read out information you need.  
      Just make sure your queries are well formed and won’t impact the applications performance.  
      To be on the safe side it’s better to run queries during non-business hours.
    </p>
    <p>
      Writing data directly to an application’s database is fraught with more potential problems.  
      Unless you know how the application behaves, you won’t know what events within the applications are bypassed by direct data injection, which could cause errors.
    </p>
    <h3>
      Robotic Process Automation
    </h3>
    <p>
      RPA is an integration method that creates software robots that act like users.  
      In this case you would need to create an application user profile for the robot and then load your robot with commands to access and manipulate the application.
    </p>
    <p>
      You could write your RPA to run locally on the target machine, but there are advantages to running it as SaaSGlue jobs.  
      You can see the results of all your RPA jobs in the SaaSGlue dashboard and know immediately when they throw an error, regardless of where in the world they’re running.
    </p>
    <p>
      When using the RPA integration method you should consider setting up a dedicated machine for the robots.  
      A headless machine sitting in a closet that has enough horsepower to run the application is all you need.
    </p>
    <h3>
      Think and act at the local command prompt
    </h3>
    <p>
      We hope these suggestions have gotten your analytical juices running.  
      Getting access to the local command prompt where the target system lives gets you 90% of the way to where you need to be.  
      That’s what the SaaSGlue agent does.
    </p>
    <p>
      The command prompt gives you a ton of freedom to access and manipulate services on the local machine.  
      Exploring everything you can do at the command line will open up multiple ways to connect to your target systems and give you flexibility to design the right workflows.
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
