class Response {
    constructor({status = 200, message, data}){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class FailResponse {
    constructor({status, message, data = null}){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
module.exports = {Response, FailResponse}