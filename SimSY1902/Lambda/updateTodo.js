"use strict";
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "todo";
var params;

function nextCardType(type) {
    var cardtype = null;
    if(type === "TODO") {
        cardtype = "DOING"
    } else if(type === "DOING") {
        cardtype = "DONE"
    } else {
        cardtype = "FAIL"
    }
    return cardtype;
}

exports.handler = async (event, context) => {
    var cardId = parseInt(event.id);
    var cardType = nextCardType(event.type.toUpperCase())
    
    params = {
        TableName: TABLE_NAME,
        Key: {
            "id": cardId
        },
        UpdateExpression: "set #col = :cardType",
        ExpressionAttributeNames: {
            "#col": "type"
        },
        ExpressionAttributeValues: {
            ":cardType": cardType
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
