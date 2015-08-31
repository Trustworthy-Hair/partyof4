module.exports = {
  sendResponse: function(res, statusCode, data){
    res.status(statusCode).send(data).end();
  }
};