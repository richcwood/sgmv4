export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: { title: 'SaaSGlue', description: 'SaaSGlue helps you create cron jobs.' }
    }
  };
}
