module.exports = {
  sendResponse: function(res, stat, data){
    res.status(stat).send(data).end;
  }
}