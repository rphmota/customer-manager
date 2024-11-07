import 'dotenv/config';

export const awsConfig = () => ({
  AWS_REGION: process.env.AWS_REGION,
  SQS: {
    URL: 'http://localstack:4566/000000000000/customers-queue',
  },
});
