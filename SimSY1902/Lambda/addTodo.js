const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "todo";

function getDate() {
    var date = new Date();
    return date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getUTCDate();
}
function getId() {
    return new Date().getTime();
}
function sanitizeString(str) {
    var sanitizedStr = str.replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&apos;");
    return sanitizedStr;
}

exports.handler = async (event, context) => {
    var name = sanitizeString(event.name);
    var sequence = parseInt(event.sequence);
    var title = sanitizeString(event.title);
    
    var params = {
        TableName: TABLE_NAME,
        Item: {
            "id": getId(),
            "name": name,
            "regDate": getDate(),
            "sequence": sequence,
            "title": title,
            "type": "TODO" ,
            "deleteFlag": false
        }
    };

    try {
        await docClient.put(params).promise();
        console.log("Success", params);
        return "Success";
    } catch (e) {
        console.error(e.message);
    }
};