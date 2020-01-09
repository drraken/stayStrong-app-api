import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";


export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableNameProducts,
    Item: {
      productId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      name: data.name,
      company: data.company,
      kcal: data.kcal,
      proteins: data.proteins,
      fats: data.fats,
      carbs: data.carbs,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}