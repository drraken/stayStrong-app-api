import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameParameters,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      parameterId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET gender = :gender, weight = :weight, height = :height, age = :age, activity = :activity, goal = :goal, kcalGoal = :kcalGoal, proteinGoal = :proteinGoal, fatGoal = :fatGoal, carbGoal = :carbGoal, setOwnGoal = :setOwnGoal",
    ExpressionAttributeValues: {
      ":gender": data.gender || null,
      ":weight": data.weight || null,
      ":height": data.height || null,
      ":age": data.age || null,
      ":activity": data.activity || null,
      ":goal": data.goal || null,
      ":kcalGoal": data.kcalGoal || null,
      ":proteinGoal": data.proteinGoal || null,
      ":fatGoal": data.fatGoal || null,
      ":carbGoal": data.carbGoal || null,
      ":setOwnGoal": data.setOwnGoal || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false,message: e });
  }
}
