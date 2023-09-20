<template>
  <Article>
    <template #title>
      Introduction to OpenAI ChatGPT Function Calling With Examples
    </template>
    <template #tags>
      <span v-for="tag in tags" class="tag is-primary">{{ tag }}</span>
    </template>

    <figure class="image is-fullwidth">
      <img src="@/assets/images/blog/intro-to-openai-chatgpt-function-calling/ChatGPTFunctionCalling1.png" alt="Head image" />
    </figure>
    <p>
      OpenAI recently introduced an exciting new feature named “Function Calling”. As the name suggests, Function Calling is a way
      for ChatGPT to call program functions. Functions can be any kind of code including HTTP APIs, database queries or just plain
      old code.
    </p>

    <h4>Function Calling Example</h4>

    <div>
      <table>
        <tr><td><b>Prompt:</b></td><td>"What is the weather like today in Chicago?"</td></tr>
        <tr> <td><b>Function Definition:</b></td> <td>computeWeather(String locationName)</td> </tr>
      </table>
    </div>
    <br>
    <p>
      Normally, GPT can't compute the weather in Chicago because it can’t access real time information.  
      By passing the function definition “computeWeather” to ChatGPT (along with a bit more information), GPT is able to understand that it can fulfill the original prompt via the computerWeather function.  
      GPT is also able to understand that the computeWeather function should be passed a parameter locationName with the value of “Chicago”.
    </p>

    <p>
      GPT isn’t able to actually invoke the computeWeather function.  
      It’s up to your client code to invoke the function, report the results back to GPT and then GPT can process the original prompt request.
    </p>

    <p>
      Here’s a diagram showing the order of how all of this works at a high level:
    </p>

    <img src="@/assets/images/blog/intro-to-openai-chatgpt-function-calling/basic_flow.png" alt="Head image" />
    
    <p>
      In <b>Step 1</b>, the client sends a prompt (“What is the weather like today in Chicago?”) as well as a list of function definitions (only 1 function in this example).  
      GPT is aware that it cannot compute the today's weather so GPT will examine whether any of the functions that the Client supplied can.  
      GPT will determine that the computeWeather function can fulfill the prompt and that the function should be supplied with a “locationName” argument.  
      GPT will look at the information available and realize that the “locationName” argument should have the value of “Chicago”.
    </p>

    <p>
      In <b>Step 2</b>, the client is responsible for actually invoking the computeWeather function.  
      The client should pass the GPT computed arguments {locationName: “Chicago”} to the function. 
      The function results (the weather today in Chicago) should be stored and passed to GPT in step 3. 
    </p>

    <p>
      In <b>Step 3</b>, the client passes the previous conversation (prompt + functions) as well as the function results (Chicago's weather) to GPT.  
      GPT will examine the entire conversation and determine it has enough information to fulfill the original prompt and respond with a summary of the current weather in Chicago today.
    </p>
    
    <br>

    <p>
      This is <b>powerful</b>. GPT is able to:
      <ul>
        <li>
          Determine if it can fulfill the prompt via one of the provided functions.
        </li>
        <li>
          Determine what arguments should be supplied to invoke the function.  
          GPT uses the previously supplied prompts, previously invoked function outputs as well as its vast LLM to understand what the argument values should be.
        </li>
      </ul>
    </p>

    <p>
      In this example, GPT can fulfill the prompt by invoking a single function.  
      In more complex situations, GPT is able to take a large list of functions and determine which functions should be invoked in the proper dependency order.  
      Follow up SaasGlue blog articles will review more complex scenarios with multiple functions / dependencies.
    </p>

    <h4>Try It Out</h4>

    <p>
      To use GPT Function Calling, you must use the Chat GPT API.  
      (Function Calling is not available in the popular Chat GPT console found at <a href="https://chat.openai.com">https://chat.openai.com</a>.)  
    </p>

    <p>
      To use the Chat GPT API, you must create an OpenAI API account at <a href="https://openai.com">https://openai.com</a>. 
      Once you’ve created an API account, you’ll be able to generate an API Key at <a href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a>.  
      The API Key will start with the value “sk-”.  
      Copy that API key - you will need this key to invoke the GPT API and test Function Calling.
    </p>

    <br>
    <p>
      <b>Enter</b> the OpenAI API Key here and it will be injected into the example curl requests below.<br>
      <input class="input" type="text" v-model="sdkKey"/>
    </p>
    <br>

    <h4>
      Try It Step 1. <br><br>
      &nbsp;&nbsp;Send prompt + functions. <br>
      &nbsp;&nbsp;Receive function_name + arguments.
    </h4>

    <p>
      The first request to the GPT API will contain the original prompt <b>+</b> the list of functions the client can invoke to fulfill the request.
    </p>

    <p>
      <button class="button copy-button" ref="code1_copy" @click="copyToClipboard('code1_pre', 'code1_copy')">Copy</button>
      <pre ref="code1_pre"><code v-html="curl1_formatted"></code></pre>
    </p>
    <p>
      The GPT API response will look something like this (some details omitted): 
      <pre><code v-html="response1_formatted"></code></pre>
      The <b>message</b> field contains a property named <b>function_call</b> which contains 2 properties: <b>name</b> and <b>arguments</b>.
    </p>

    <p>
      Your client code is responsible to pay attention to the <b>function_call.name</b> property.  
      The API request in step 1 promised the existence of the function named <b>computeWeather</b> and GPT is now requesting that the function be invoked.
    </p>

    <h4>
      Try It Step 2. <br><br>
      &nbsp;&nbsp;Invoke the Function(s)
    </h4>

    <p>
      Your client code is responsible for invoking the function(s) that GPT requested.
      Your client code functions should be invoked with the recommended arguments supplied by GPT.
    </p>

    <p>
      Example of client code invoking custom functions (some details omitted): 
      <pre><code v-html="customCode_formatted"></code></pre>
    </p>

    <h4>
      Try It Step 3. <br><br>
      &nbsp;&nbsp;Send function results to GPT.<br>
      &nbsp;&nbsp;Receive GPT answer.
    </h4>

    <p>
      The second request to GPT will contain all previous messages but also adds the funtion result to GPT.
      The function result is sent to GPT as a new message in the messages array the the following properties: 
      <ul>
        <li>"role" == "function"</li>
        <li>"name" == "compute"</li>
        <li>"content" == {\"description\": \"Cloudy with a chance of meatballs!\"} </li>
      </ul>
    </p>

    <p>
      <button class="button copy-button" ref="code2_copy" @click="copyToClipboard('code2_pre', 'code2_copy')">Copy</button>
      <pre ref="code2_pre"><code v-html="curl2_formatted"></code></pre>
    </p>
    <p>
      The GPT API response will look something like this (some details omitted): 
      <pre><code v-html="response2_formatted"></code></pre>
      The <b>message</b> field will have a <b>role</b> of <b>assistant</b> which means GPT is responding to the original prompt with a response.
      The response is the <b>content</b> field of the final answer "The weather today in Chicago is cloudy with a chance of meatballs".
      Which is the weather calculated by the computeWeather function definition. 
    </p>

    <br><br>
    <h4>Recap</h4>
    <p>
      OpenAI ChatGPT Function Calling is a powerful mechanism to leverage AI to dynamically invoke code.
    </p>
    <p>
      This example is trivial but there are other much more complicated examples.  
      In <a href="https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb"> one example</a> 
      GPT is able to ingest a small database schema, be prompted with natural language requests and respond with fairly complicated / valid sql queries.
    </p>

    <p>
      GPT is also able to accept many function definitions and determine which function (if any) can fulfil the original prompt.
      GPT can even invoke multiple functions in the correct order and use the output of previously invoked functions as the input to subsequent function calls.
    </p>

    <br>
    <h4>Hallucination / Dangers</h4>
    <p>
      In the previous curl request examples, a temperature parameter of "0" is used.  Temperature represents how random GPT should make the request.
    </p>
    <p>
      Sometimes it's useful to request randomness / creativity in GPT responses.  This is usually undesired behavior with Function Calling.
    </p>
    <p>
      It's important to verify GPT Function Calling behavior with a human spot checking GPT behaviors.
    </p>

  </Article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.min.css';
import Article from '../Article.vue';
import { Tag } from '../articles';

export default defineComponent({
  name: 'intro-to-openai-chatgpt-function-calling',
  components: { Article },

  methods: {
    async copyToClipboard(preRefName: string, buttonRefName: string){
      const code = (this.$refs[preRefName] as any).textContent;
      if(code){
        await navigator.clipboard.writeText(code);
        
        (this.$refs[buttonRefName] as any).innerHTML = 'Code Copied!';
        setTimeout(() => {
          (this.$refs[buttonRefName] as any).innerHTML = 'Copy';
        }, 2500);
      }
    }
  },

  data () {
    return {
      // sdkKey: '',
      sdkKey: 'Enter Your OpenAI API Key Here',
      
      curl1: `curl --location 'https://api.openai.com/v1/chat/completions' \
  --header 'Authorization: Bearer $SDK_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
      "model": "gpt-3.5-turbo-0613",
      "messages": [{"role": "user", "content": "What is the weather today in Chicago?"}],
      "functions": [{
        "name": "computeWeather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "locationName": {
              "type": "string",
              "description": "The name of the location."
            }
          },
          "required": ["locationName"]
        }
      }],
      "temperature": 0
                  }'`,
      response1: `"choices": [
    {
      "index": "0",
      "message": {
        "role": "assistant",
        "content": null,
        "function_call": {
          "name": "computeWeather",
          "arguments": "{"locationName": "Chicago"}"
        }
      },
      "finish_reason": "function_call"
    }
  ]`,
  customCode1: `
    function handleGPTResponse(gtpResponse){
      if(gptResponse.choices[0].message.function_call.name === 'ComputeWeather'){
        const theWeather = computeWeather(gptResponse.choices[0].message.function_call.arguments);
        // send the weatherResponse to GPT
      }
    }

    function computeWeather(location){
      if(location.name === 'Chicago'){
        return 'Cloudy with a chance of meatballs';
      }
      else {
        return 'Sunny';
      }
    }
  `,
    curl2: `curl --location 'https://api.openai.com/v1/chat/completions' \
--header 'Authorization: Bearer $SDK_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "gpt-3.5-turbo-0613",
    "messages": [
        {"role": "user", "content": "What is the weather today in Chicago?"},
        {"role": "assistant", "content": null,
            "function_call": {
                    "name": "computeWeather",
                    "arguments": "{\\n  \\"locationName\\": \\"Chicago\\"\\n}"
            }
        },
        {"role": "function", "name": "computeWeather", "content": "Cloudy with a chance of meatballs."}
    ],
    "functions": [{
      "name": "computeWeather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "locationName": {
            "type": "string",
            "description": "The name of the location."
          }
        },
        "required": ["locationName"]
      }
    }],
    "temperature": 0
}'`,
      response2: `{
      "index": "0",
      "message": {
        "role": "assistant",
        "content": "The weather today in Chicago is cloudy with a chance of meatballs."
      },
      "finish_reason": "stop"
    }`
    
  }},
  computed: {
    tags(): Tag[] {
      return [Tag.OPEN_AI, Tag.CHAT_GPT, Tag.FUNCTION_CALLING, Tag.EXAMPLES];
    },
    curl1_formatted(){
      const code = this.curl1.replace('$SDK_KEY', this.sdkKey);
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    },
    response1_formatted(){
      return Prism.highlight(this.response1, Prism.languages.javascript, 'javascript');
    },
    customCode_formatted(){
      return Prism.highlight(this.customCode1, Prism.languages.javascript, 'javascript');
    },
    curl2_formatted(){
      const code = this.curl2.replace('$SDK_KEY', this.sdkKey);
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    },
    response2_formatted(){
      return Prism.highlight(this.response2, Prism.languages.javascript, 'javascript');
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

</style>
