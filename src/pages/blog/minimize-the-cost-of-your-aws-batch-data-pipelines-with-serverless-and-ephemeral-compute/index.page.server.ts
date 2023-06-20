export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: "Build AWS Data Pipelines with Ephemeral and Serverless Compute | SaaSGlue",
        description:
          "The most expensive cloud compute is the compute you’re paying for that isn’t doing anything. If you currently manage or are planning to build batch processing data pipelines in AWS you will want to minimize your cloud costs by utilizing serverless and ephemeral compute. This article demonstrates how to build a data pipeline that watches for files in an S3 bucket, provisions compute to process the files, processes the files, and automatically terminates the compute after an idle timeout period.",
      },
    },
  };
}
