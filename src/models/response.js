class Response {
    constructor({status = 200, message = "Thành công", data}){
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
class ErrorServerResponse {
    constructor(){
        this.status = 500;
        this.message =  "Error From Server";
        this.data = null;
    }
}
class Page {
    constructor({data,currentPage,totalPage}){
        this.data = data;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
    }
}
module.exports = {Response, FailResponse, Page,ErrorServerResponse}

