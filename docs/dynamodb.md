```shell
docker run -p 8000:8000 amazon/dynamodb-local
```

```shell
aws dynamodb create-table \
  --table-name unimarket-chat-connections \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000 \
  --region us-east-1
```

```shell
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

```shell
aws dynamodb scan --table-name unimarket-chat-connections --endpoint-url http://localhost:8000
```

```shell

```

```shell

```

```shell

```
