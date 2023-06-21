import cronJobsWithSgHeadImage from '@/assets/images/blog/cron-jobs-with-sg/head-image.webp';
import scaleDataPipelinesPart1HeadImage from '@/assets/images/blog/scale-data-pipelines-part1/head-image.webp';
import scaleDataPipelinesPart2HeadImage from '@/assets/images/blog/scale-data-pipelines-part2/head-image.webp';
import awsDataPipelinesHeadImage from "@/assets/images/blog/aws-data-pipelines/head-image.webp";
import buildTwitterAnalyzerHeadImage from '@/assets/images/blog/twitter-analyzer/head-image.webp';

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
  RABBITMQ = 'RabbitMQ'
}

export default [{
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
  uri: '/blog/scale-your-streaming-data-pipelines-with-kubernetes-part1',
  date: '2022-4-23',
  image: scaleDataPipelinesPart1HeadImage,
  title: 'Scale your streaming data pipelines efficiently with kubernetes — Part 1.',
  description: 'This article describes a system architecture for streaming data pipelines that scales automatically while minimizing compute costs.',
  tags: [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE]
},
{
  author: 'Richard Wood',
  uri: '/blog/scale-your-streaming-data-pipelines-with-kubernetes-part2',
  date: '2022-7-18',
  image: scaleDataPipelinesPart2HeadImage,
  title: 'Scale your streaming data pipelines efficiently with kubernetes — Part 2.',
  description: 'This article demonstrates an implementation of a system architecture for streaming data pipelines that scales automatically while minimizing compute costs using SaaSGlue.',
  tags: [Tag.DATA_PIPELINE, Tag.KUBERNETES, Tag.AUTOSCALING, Tag.CLOUD_COST_MANAGEMENT, Tag.EVENT_DRIVEN_ARCHITECTURE,
    Tag.RABBITMQ]
},
{
  author: "Richard Wood",
  uri: "/blog/minimize-the-cost-of-your-aws-batch-data-pipelines-with-serverless-and-ephemeral-compute",
  date: "2022-1-22",
  image: awsDataPipelinesHeadImage,
  title: "Minimize the cost of your AWS batch data pipelines with serverless and ephemeral compute.",
  description:
    "The most expensive cloud compute is the compute you’re paying for that isn’t doing anything. If you currently manage or are planning to build batch processing data pipelines in AWS you will want to minimize your cloud costs by utilizing serverless and ephemeral compute. This article demonstrates how to build a data pipeline that watches for files in an S3 bucket, provisions compute to process the files, processes the files, and automatically terminates the compute after an idle timeout period.",
  tags: [Tag.AUTO_SOFT, Tag.DATA_PIPELINE, Tag.CLOUD_COST_MANAGEMENT, Tag.SERVERLESS_ARCHITECTURE],
},
{
  author: 'Richard Wood',
  uri: '/blog/how-to-build-a-twitter-trends-analyzer-with-saasglue',
  date: '2021-7-17',
  image: buildTwitterAnalyzerHeadImage,
  title: 'How to build a twitter analyzer with a hybrid cloud data pipeline and a single page web app.',
  description: 'This article describes how to build a "What\'s Trending on Twitter" single page web app with a hybrid cloud data pipeline using SaaSGlue.',
  tags: [Tag.DATA_ENGINEERING, Tag.SOFT_DEV, Tag.HYBRID_CLOUD, Tag.DATA_SCIENCE, Tag.DATA_PIPELINE]
}] as Article[];
