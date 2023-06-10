import cronJobsWithSgHeadImage from '@/assets/images/blog/cron-jobs-with-sg/head-image.webp';

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
}

export default [{
  author: 'Richard Wood',
  uri: '/blog/time-for-a-change-manage-and-monitor-your-cron-jobs-in-the-cloud-with-saasglue',
  date: '2023-4-8',
  image: cronJobsWithSgHeadImage,
  title: 'Time for a Change: Manage and Monitor Your Cron Jobs in the Cloud with SaaSGlue',
  description: 'This article will describe how to import your Cron jobs to SaaSGlue in five minutes or less. To see how it works in action',
  tags: [Tag.CRON, Tag.SOFT_DEV, Tag.AUTO_SOFT, Tag.SAAS, Tag.SAAS_TOOLS]
}] as Article[];
