import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

const REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE = process.env.DYNAMODB_TABLE || 'unimarket-chat-connections';

const isOffline = process.env.IS_OFFLINE;

const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: isOffline ? 'http://localhost:8000' : undefined,
});
export const docClient = DynamoDBDocumentClient.from(ddbClient);

export async function saveConnection(userId: string, connectionId: string) {
  await docClient.send(
    new PutCommand({TableName: TABLE, Item: {userId, connectionId}}),
  );
}

export async function deleteConnection(userId: string) {
  await docClient.send(new DeleteCommand({TableName: TABLE, Key: {userId}}));
}

export async function getConnection(userId: string) {
  const res = await docClient.send(
    new GetCommand({TableName: TABLE, Key: {userId}}),
  );
  return res.Item?.connectionId;
}

export async function getUserId(connectionId: string) {
  const res = await docClient.send(
    new GetCommand({TableName: TABLE, Key: {connectionId}}),
  );
  return res.Item?.userId;
}
