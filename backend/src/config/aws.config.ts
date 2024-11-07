import 'dotenv/config';

export const awsConfig = () => ({
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_SQS_QUEUE_URL: process.env.AWS_SQS_QUEUE_URL,
  SQS: {
    URL: process.env.AWS_SQS_QUEUE_URL,
  },
});
