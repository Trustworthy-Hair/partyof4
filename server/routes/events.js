// events.js
var eventController = require('../controllers/events');

module.exports = function(app){
  app.get('/events', eventController.getNearbyEvents);
  app.post('/events', eventController.createEvent);

  app.get('/events/:eventId', eventController.getEvent);
  app.post('/events/:eventId', eventController.updateEvent);

  app.get('/users/:userId/history', eventController.getHistory);
};
