import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";


export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableNameParameters,
    Item: {
      parameterId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      gender: data.gender,
      weight: data.weight,
      height: data.height,
      age: data.age,
      activity: data.activity,
      goal: data.goal,
      kcalGoal: data.kcalGoal,
      proteinGoal: data.proteinGoal,
      fatGoal: data.fatGoal,
      carbGoal: data.carbGoal,
      setOwnGoal: data.setOwnGoal
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, message: e });
  }
}