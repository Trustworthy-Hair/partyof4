// events.js
var utils = require('../config/utils');

module.exports = {
  getNearbyEvents: function(){
    /* Select all events from events table where distance
       between user and events < some number. */
  },

  createEvent: function(req, res){
    var models = req.app.get('models');
    var Event = models.Event;

    /* The newEvent object contains a number of properties -- some obtained
       from the body of the request and some defaults. This object is used
       to build the Sequelize model that will be saved in the database. */
    var newEvent = {};
    for (var key in req.body) {
      newEvent[key] = req.body[key];
    }
    newEvent.completedStatus = false;

    /* Builds a Sequelize model based on newEvent object and saves to the database. 
       Sends a response if this is successful. Otherwise, logs an error. */
    Event.sync().then(function () {
      return Event.create(newEvent);
    }).then (function (newEvent) {
      utils.sendResponse(res, 201, newEvent);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  getEvent: function(req, res){
    var models = req.app.get('models');
    var Event = models.Event;
    var eventId = req.params.eventId;

    Event.sync().then(function () {
      return Event.findById(eventId);
    }).then(function (event) {
      utils.sendResponse(res, 200, event);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  updateEvent: function (req, res) {
    var models = req.app.get('models');
    var Event = models.Event;
    var eventId = req.params.eventId;

    var updatedEvent = {};
    for (var key in req.body) {
      updatedEvent[key] = req.body[key];
    }

    var options = {};
    options.where = { id: eventId };
    options.returning = true;

    Event.sync().then(function () {
      return Event.update(updatedEvent, options);
    }).then(function (update) {
      /* Sequelize update method returns an array. Second element is an 
         array contained updated records. We want the first updated record 
         since there should be only one. See documentation of .update() at: 
         http://docs.sequelizejs.com/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows */
      updatedEvent = update[1][0];
      utils.sendResponse(res, 200, updatedEvent);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  getEventHistoryByUser: function (req, res) {
    var models = req.app.get('models');
    var User = models.User;
    var userId = req.params.userId;

    User.sync().then(function () {
      return User.findById(userId);
    }).then(function (user) {
      return user.getEvents();
    }).then(function (events) {
      utils.sendResponse(res, 201, events);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  }
};
