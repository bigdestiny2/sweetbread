const request = require("request");

const createRequest = (input, callback) => {
    const url =  "http://127.0.0.1:8070/json_rpc";
    const addresses = input.data.contributorAddress
    const amount = input.data.weeklyPayout;
    let transfer = {
        id: input.id,
        jsonrpc: "2.0",
        addresses: addresses,
        amount: amount
    };
    let options = {
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        rejectUnauthorized: false,
        body: dataQuery,
        json: true
    };
    // Removes undefined values (if params were not given)
    request.post(JSON.parse(JSON.stringify(options)), (error, response, body) => {
        if (error || response.statusCode >= 400 || body.error) {
            callback(response.statusCode, {
                jobRunID: input.id,
                status: "errored",
                error: body,
                statusCode: response.statusCode
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
                data: body,
                statusCode: response.statusCode
            });
        }
    });
};

exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.handler = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
};

module.exports.createRequest = createRequest;