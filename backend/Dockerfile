FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install -g @nestjs/cli 

COPY . .

ENV DATABASE_HOST=db
ENV DATABASE_PORT=5432
ENV DATABASE_USER=postgres
ENV DATABASE_PASS=postgres
ENV DATABASE_NAME=manager
ENV PORT=9090
ENV AWS_REGION=us-east-1
ENV AWS_SQS_QUEUE_URL="http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/customers-queue"
ENV AWS_ACCESS_KEY_ID=dummy
ENV AWS_SECRET_ACCESS_KEY=dummy


RUN npm run build


RUN chmod +x .docker/entrypoint.sh

ENTRYPOINT [ ".docker/entrypoint.sh" ]