import cronJobsWithSgHeadImage from '@/assets/images/blog/cron-jobs-with-sg/head-image.webp';
import betterKubernetesJobSchedulerHeadImage from '@/assets/images/blog/kubernetes-job-scheduler/head-image.webp';
import scaleDataPipelinesPart1HeadImage from '@/assets/images/blog/scale-data-pipelines-part1/head-image.png';
import scaleDataPipelinesPart2HeadImage from '@/assets/images/blog/scale-data-pipelines-part2/head-image.png';
import awsDataPipelinesHeadImage from "@/assets/images/blog/aws-data-pipelines/head-image.webp";
import buildTwitterAnalyzerHeadImage from '@/assets/images/blog/twitter-analyzer/head-image.webp';
import chatGPTFunctionCalling1 from '@/assets/images/blog/intro-to-openai-chatgpt-function-calling/ChatGPTFunctionCalling1.png';
// import patientReminderService from '@/assets/images/blog/patient-reminder-service/basic_flow.png';
import connectToDesktopSoftware from '@/assets/images/blog/connect-to-desktop-software/head-image.png';
// import datasyncForMultiplePMSVersions from '@/assets/images/blog/data-sync-for-multiple-pms-versions/head-image.png';

export interface Article {
  author: string;
  uri: string;
  date: string;
  image: string;
  title: string;
  description: string;
  tags: Tag[];
}

export enum Tag {
  CRON = 'Cron',
  SOFT_DEV = 'Software Development',
  AUTO_SOFT = 'Automation Software',
  SAAS = 'SaaS',
  SAAS_TOOLS = 'SaaS Tools',
  DATA_ENGINEERING = 'Data Engineering',
  HYBRID_CLOUD = 'Hybrid Cloud',
  DATA_SCIENCE = 'Data Science',
  DATA_PIPELINE = 'Data Pipeline',
  KUBERNETES = 'Kubernetes',
  AUTOSCALING = 'Autoscaling',
  CLOUD_COST_MANAGEMENT = 'Cloud Cost Management',
  EVENT_DRIVEN_ARCHITECTURE = 'Event Driven Architecture',
  SERVERLESS_ARCHITECTURE = 'Serverless Architecture',
  RABBITMQ = 'RabbitMQ',
  CRONJOB = 'Cronjob',
  LOW_CODE = 'Low Code',
  OPEN_AI = 'OpenAI',
  CHAT_GPT = 'ChatGPT',
  FUNCTION_CALLING = 'Function Calling',
  EXAMPLES = 'Examples',
  DENTAL = 'Dental',
  HEALTHCARE = 'Healthcare',
  CLOUD_APP = 'Cloud App',
  CLOUD_SERVICE = 'Cloud Service',
  DENTAL_SOFTWARE = 'Dental Software',
  INTEGRATION = 'Integration'
}

export default [
  // TODO: uncomment when ready to publish
  // {
  //   author: 'SaasGlue',
  //   uri: '/blog/patient-reminder-service',
  //   date: '2023-9-20',
  //   image: patientReminderService,
  //   title: 'Support a Patient Reminder Service with SaasGlue',
  //   description: 'Learn how to use SaasGlue for the core components in a patient reminder service.',
  //   tags: [Tag.DENTAL, Tag.HYBRID_CLOUD, Tag.HEALTHCARE, Tag.CLOUD_APP, Tag.CLOUD_SERVICE]
  // },
  // {
  //   author: 'SaasGlue',
  //   uri: '/blog/data-sync-for-multiple-pms-versions',
  //   date: '2023-9-20',
  //   image: datasyncForMultiplePMSVersions,
  //   title: `Don't let PMS upgrades break your data sync`,
  //   description: 'See how you can design data sync jobs that stay ahead of practice management software upgrades',
  //   tags: [Tag.DENTAL, Tag.HYBRID_CLOUD, Tag.HEALTHCARE, Tag.CLOUD_APP, Tag.CLOUD_SERVICE]
  // },
  {
    author: 'SaasGlue',
    uri: '/blog/connect-to-desktop-software',
    date: '2023-9-20',
    image: connectToDesktopSoftware,
    title: 'How to connect desktop software in a SaaSGlue job',
    description: 'Learn several methods for connecting to desktop software with SaaSGlue',
    tags: [Tag.DENTAL_SOFTWARE, Tag.DATA_ENGINEERING, Tag.INTEGRATION]
  },
  {
    author: 'Bart Wood',
    uri: '/blog/intro-to-openai-chatgpt-function-calling',
    date: '2023-8-6',
    image: chatGPTFunctionCalling1,
    title: 'Intro to ChatGPT Function Calling',
    description: 'ChatGPT Function Calling helps you convert natural language to executed code.',
    tags: [Tag.CHAT_GPT, Tag.FUNCTION_CALLING]
  },
  {
  author: 'Richard Wood',
  uri: '/blog/time-for-a-change-manage-and-monitor-your-cron-jobs-in-the-cloud-with-saasglue',
  date: '2023-4-8',
  image: cronJobsWithSgHeadImage,
  title: 'Time for a Change: Manage and Monitor Your Cron Jobs in the Cloud with SaaSGlue',
  description: 'This article demonstrates how to import your Cron jobs to SaaSGlue in five minutes or less.',
  tags: [Tag.CRON, Tag.SOFT_DEV, Tag.AUTO_SOFT, Tag.SAAS, Tag.SAAS_TOOLS]
},
{
  author: 'Richard Wood',
  uri: '/blog/a-better-kubernetes-job-scheduler',
  date: '2022-10-29',
  image: betterKubernetesJobSchedulerHeadImage,
  title: 'A Better Kubernetes Job Scheduler',
  description: 'SaaSGlue simplifies scheduling and running containerized applications as Kubernetes Jobs.',
  tags: [Tag.KUBERNETES, Tag.CRONJOB, Tag.AUTO_SOFT, Tag.SAAS, Tag.LOW_CODE]
},
{
  author: 'Richard Wood',
  uri: '/blog/scale-your-streaming-data-pipelines-with-kubernetes-part1',
  date: '2022-4-23',
  image: scaleDataPipelinesPart1HeadImage,
  title: 'Scale your streaming data pipelines efficiently with kubernetes — Part 1',
  description: 'This article describes a system architecture for streaming data pipelines that scales automatically while minimizing compute costs.',
  tags: [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE]
},
{
  author: 'Richard Wood',
  uri: '/blog/scale-your-streaming-data-pipelines-with-kubernetes-part2',
  date: '2022-7-18',
  image: scaleDataPipelinesPart2HeadImage,
  title: 'Scale your streaming data pipelines efficiently with kubernetes — Part 2',
  description: 'This article demonstrates an implementation of a system architecture for streaming data pipelines that scales automatically while minimizing compute costs using SaaSGlue.',
  tags: [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE,
    Tag.RABBITMQ]
},
{
  author: "Richard Wood",
  uri: "/blog/minimize-the-cost-of-your-aws-batch-data-pipelines-with-serverless-and-ephemeral-compute",
  date: "2022-1-22",
  image: awsDataPipelinesHeadImage,
  title: "Minimize the cost of your AWS batch data pipelines with serverless and ephemeral compute",
  description:
    "The most expensive cloud compute is the compute you’re paying for that isn’t doing anything. If you currently manage or are planning to build batch processing data pipelines in AWS you will want to minimize your cloud costs by utilizing serverless and ephemeral compute. This article demonstrates how to build a data pipeline that watches for files in an S3 bucket, provisions compute to process the files, processes the files, and automatically terminates the compute after an idle timeout period.",
  tags: [Tag.AUTO_SOFT, Tag.DATA_PIPELINE, Tag.CLOUD_COST_MANAGEMENT, Tag.SERVERLESS_ARCHITECTURE],
},
{
  author: 'Richard Wood',
  uri: '/blog/how-to-build-a-twitter-trends-analyzer-with-saasglue',
  date: '2021-7-17',
  image: buildTwitterAnalyzerHeadImage,
  title: 'How to build a twitter analyzer with a hybrid cloud data pipeline and a single page web app',
  description: 'This article describes how to build a "What\'s Trending on Twitter" single page web app with a hybrid cloud data pipeline using SaaSGlue.',
  tags: [Tag.DATA_ENGINEERING, Tag.SOFT_DEV, Tag.HYBRID_CLOUD, Tag.DATA_SCIENCE, Tag.DATA_PIPELINE]
}] as Article[];
