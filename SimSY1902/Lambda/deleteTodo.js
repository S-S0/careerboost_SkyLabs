"use strict";
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "todo";
var params;

exports.handler = async (event, context) => {
    var cardId = event.id;
    
    params = {
        TableName: TABLE_NAME,
        Key: {
            "id": cardId
        },
        UpdateExpression: "set #col = :flag",
        ExpressionAttributeNames: {
            "#col": "deleteFlag"
        },
        ExpressionAttributeValues: {
            ":flag": true
        }
    };
    try {
        await docClient.update(params).promise();
        console.log("Success", params);
        return "Success";
    } catch (e) {
        console.error(e.message);
    }
};