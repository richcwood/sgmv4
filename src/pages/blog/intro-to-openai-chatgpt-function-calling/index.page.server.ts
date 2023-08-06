export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: { 
        sdkKey: 'fuk',
        title: 'Intro to OpenAI ChatGPT Function Calling | SaaSGlue', 
        description: 'A simple introduction to how OpenAI ChatGPT Function Calling works with simple examples.' 
      }
    }
  };
}
