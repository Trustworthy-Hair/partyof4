// events.js
var utils = require('../config/utils');

module.exports = {
  getNearbyEvents: function(req, res){
    /* Select all events from events table where distance
       between user and events < some number. */
    var models = req.app.get('models');
    var Event = models.Event;
    var Location = models.Location;

    var radius = req.query.radius || 1000;
    var currentLocation = utils.checkLatLong(req, res);

    var options = {
      include: [Location]
    }; 

    if (currentLocation) {
      Event.findAll(options).then(function(events) {
        var nearbyEvents = events.map(function(event) {
          var eventLocation = {
            latitude: event.Location.latitude,
            longitude: event.Location.longitude
          };
          var dist = utils.checkDistance(currentLocation, eventLocation);
          event.dataValues.distance = dist;
          return event;
        })
        .filter(function(event) {
          return event.dataValues.distance <= radius;
        });

        utils.sendResponse(res, 201, nearbyEvents);
      }).catch(function(err) {
        console.error(err);
      });
    }
  },

  createEvent: function(req, res){
    var models = req.app.get('models');
    var Event = models.Event;
    var UserEvent = models.UserEvent;

    /* The newEvent object contains a number of properties -- some obtained
       from the body of the request and some defaults. This object is used
       to build the Sequelize model that will be saved in the database. */
    var newEvent = {};
    for (var key in req.body) {
      newEvent[key] = req.body[key];
    }
    newEvent.completedStatus = false;

    if (newEvent.hostId !== req.userId) {
      res.status(403).send('Not authorized to create an event with this hostId.').end();
    } else {
      /* Builds a Sequelize model based on newEvent object and saves to the database. 
         Sends a response if this is successful. Otherwise, logs an error. */
      Event.sync().then(function () {
        return Event.create(newEvent);
      }).then (function (newEvent) {
        utils.sendResponse(res, 201, newEvent);

        var newUserEvent = {
          EventId: newEvent.id,
          UserId: req.userId,
          cohost: true
        };  

        UserEvent.sync().then(function() {
          return UserEvent.create(newUserEvent);
        });

      }).catch(function (err) {
        console.log('Error: ', err);
      });
    }
  },

  getEvent: function(req, res){
    var models = req.app.get('models');
    var Event = models.Event;
    var eventId = req.params.eventId;
    var Location = models.Location;
    var User = models.User;

    var options = {
      where: {id: eventId},
      include: [Location, User]
    }; 

    Event.sync().then(function () {
      return Event.findOne(options);
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

    var currentUser = req.userId;

    var updatedEvent = {};
    for (var key in req.body) {
      updatedEvent[key] = req.body[key];
    }

    var options = {};
    options.where = { id: eventId };
    options.returning = true;

    Event.sync().then(function () {
      return Event.findOne(options);
    }).then(function(event) {
      if (event.hostId === currentUser) {
        return Event.update(updatedEvent, options);
      } else {
        return false;
      }
    }).then(function (update) {
      /* Sequelize update method returns an array. Second element is an 
         array contained updated records. We want the first updated record 
         since there should be only one. See documentation of .update() at: 
         http://docs.sequelizejs.com/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows */
      if (update) {
        updatedEvent = update[1][0];
        utils.sendResponse(res, 200, updatedEvent);
      } else {
        utils.sendResponse(res, 403, 'Not authorized to edit this event');
      }
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  joinEvent: function(req, res) {
    var models = req.app.get('models');
    var UserEvent = models.UserEvent;

    var currentUser = req.userId;
    var newUserEvent = {
      EventId: req.params.eventId,
      UserId: currentUser,
      arrivalStatus: 'Pending',
      cohost: false
    };  

    UserEvent.sync().then(function() {
      return UserEvent.create(newUserEvent);
    }).then(function(userEvent) {
      utils.sendResponse(res, 200, userEvent);
    }).catch(function(err) {
      utils.sendResponse(res, 500, 'Error: ', err);
    });
  },

  approveUser: function(req, res) {
    var models = req.app.get('models');
    var Event = models.Event;
    var UserEvent = models.UserEvent;

    var currentUser = req.userId;
    var user = req.body.user;
    var approved = req.body.approved;

    if ((user !== undefined) && (approved !== undefined)) {
      Event.sync().then(function() {
        return Event.findById(req.params.eventId);
      }).then(function(event) {
        if (event.hostId === currentUser) {
          var options = {where: { EventId: req.params.eventId, UserId: user }};
          UserEvent.sync().then(function() {
            return UserEvent.findOne(options);
          }).then(function(userevent) {
            var status = approved ? 'Accepted' : 'Declined';
            return UserEvent.update({ userConfirmed: approved, arrivalStatus: status }, options);
          }).then(function (update) {
            utils.sendResponse(res, 200, 'Updated user');
          });
        } else {
          utils.sendResponse(res, 403, 'Only the host can approve users');
        }
      }).catch(function(err) {
        utils.sendResponse(res, 500, 'Error: ', err);
      });
    } else {
      utils.sendResponse(res, 400, 'Request body should contain user id and approval status');
    }
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
