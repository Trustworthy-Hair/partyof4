// events.js
var eventController = require('../controllers/events');

module.exports = function(app){
  app.get('/events', eventController.nearYou);
  app.post('/events', eventController.creatEvent);
  app.get('/events/:id', eventController.getEvent);
  app.post('/events/:id', eventController.updateEvent);
};
