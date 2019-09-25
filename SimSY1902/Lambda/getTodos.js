const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "todo";
var params;

exports.handler = async (event, context) => {
    params = {
        TableName: TABLE_NAME,
        FilterExpression: "#delflag = :flag",
        ExpressionAttributeNames: {
            "#delflag": "deleteFlag",
        },
        ExpressionAttributeValues: {
            ":flag": false,
        }
    };
    
    try {
        var result = await docClient.scan(params).promise();
        console.log("Success", params);
        return result;
    } catch (e) {
        console.error(e.message);
    }
};
