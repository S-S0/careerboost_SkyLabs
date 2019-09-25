var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();
exports.handler = async (event) => {
var tableParams = {
    AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'N'
            }
        ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
        TableName: 'todo',
        StreamSpecification: {
            StreamEnabled: false
        }
    };
    try {
        await ddb.createTable(tableParams).promise();
    } catch (e) {
        console.error(e.message)
    }
    
};
