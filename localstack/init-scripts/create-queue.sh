#!/bin/bash
echo "Esperando o LocalStack iniciar..."
sleep 10
awslocal sqs create-queue --queue-name customers-queue

echo "LocalStack disponível, criando a fila customers-queue..."

echo "Fila customers-queue criada com sucesso!"
