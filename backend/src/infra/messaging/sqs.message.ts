import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
  private sqsClient: SQSClient;
  private queueUrl: string;

  constructor(private config: ConfigService) {
    this.sqsClient = new SQSClient({
      region: this.config.get('AWS_REGION'),
      endpoint: this.config.get('SQS').URL,
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.queueUrl = this.config.get('AWS_SQS_QUEUE_URL');
  }

  async sendMessage(messageBody: string) {
    const command = new SendMessageCommand({
      QueueUrl: this.config.get('SQS').URL,
      MessageBody: messageBody,
    });
    return this.sqsClient.send(command);
  }
}
//'http://localstack:4566/000000000000/customers-queue',
