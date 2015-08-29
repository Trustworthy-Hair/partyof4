// events.js
var eventController = require('../controllers/events');

module.exports = function(app){
  app.get('/events', eventController.getNearbyEvents);
  app.post('/events', eventController.createEvent);
  app.get('/events/:id', eventController.getEvent);
  app.post('/events/:id', eventController.updateEvent);
};
