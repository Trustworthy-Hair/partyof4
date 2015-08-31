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
    newEvent.HostId = req.body.HostId;
    newEvent.locationId = req.body.locationId;
    newEvent.plannedTime = req.body.plannedTime;
    newEvent.capacity = req.body.capacity;
    newEvent.currentSize = 1;
    newEvent.currentActivity = "Planning";
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

  getEvent: function(){

  },

  updateEvent: function(){

  }
};
