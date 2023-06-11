import cronJobsWithSgHeadImage from '@/assets/images/blog/cron-jobs-with-sg/head-image.webp';
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
  DATA_PIPELINE = 'Data Pipeline'
}

export default [{
  author: 'Richard Wood',
  uri: '/blog/time-for-a-change-manage-and-monitor-your-cron-jobs-in-the-cloud-with-saasglue',
  date: '2023-4-8',
  image: cronJobsWithSgHeadImage,
  title: 'Time for a Change: Manage and Monitor Your Cron Jobs in the Cloud with SaaSGlue',
  description: 'This article demonstrates how to import your Cron jobs to SaaSGlue in five minutes or less. To see how it works in action',
  tags: [Tag.CRON, Tag.SOFT_DEV, Tag.AUTO_SOFT, Tag.SAAS, Tag.SAAS_TOOLS]
},
{
  author: 'Richard Wood',
  uri: '/blog/how-to-build-a-twitter-trends-analyzer-with-saasglue',
  date: '2021-7-17',
  image: buildTwitterAnalyzerHeadImage,
  title: 'How to build a twitter analyzer with a hybrid cloud data pipeline and a single page web app.',
  description: 'This article describes how to build a "what\'s trending on twitter" single page web app with a hybrid cloud data pipeline using SaaSGlue.',
  tags: [Tag.DATA_ENGINEERING, Tag.SOFT_DEV, Tag.HYBRID_CLOUD, Tag.DATA_SCIENCE, Tag.DATA_PIPELINE]
}] as Article[];

