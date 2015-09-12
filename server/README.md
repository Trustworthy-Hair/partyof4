# Internal API 

## Summary

- /locations
- /events 
- /events/:id
- /events/:id/join
- /events/:id/approve
- /events/:id/status
- /users/login
- /users/signup
- /users/:id
- /users/:id/reviews

## General 

ALL POST requests except login&signup require a token in the form of: 

- URL parameter named "accessToken"
- Property in the body object named "accessToken"
- Request header 'x-access-token'

## /locations 
###GET request
Returns a list of venues from the Foursquare API near a given location

#### Required urls params 
- latitude : latitude of user's position
- longitude : longitude on user's position

#### Optional urls params 
- q : search term for querying foursquare
- radius : max distance (in meters) from current location for searching for venues
- open: 0 or 1: boolean value for whether to only return venues open now (default is 1)

#### Example request
/locations?latitude=37.7837209&longitude=-122.4090445&q=donuts&radius=500&open=0

#### Response Format  
```javascript
{ locations: [
  {
    locationId: "44cf44a2f964a52020361fe3",
    name: "Bob's Donut & Pastry Shop",
    location: [
      "1621 Polk St (btwn Clay & Sacramento)",
      "San Francisco, CA 94109",
      "United States"
    ],
    distance: 1372,
    price: 1,
    tags: ["Donut Shop"],
    coords: {latitude: 37.791704,longitude: -122.420935}
  }]}
```

## /events 
###GET request
Returns a list of events near a given location

#### Required urls params 
- latitude : latitude of user's position
- longitude : longitude on user's position

#### Optional urls params 
- q : search term for querying events table
- radius : max distance (in meters) from current location for searching for events (default is 1000)

#### Example request
/events?latitude=37.7837209&longitude=-122.4090445&q=coffee&radius=200

#### Response Format
```javascript
[{
  id: 9,
  plannedTime: "2016-05-08T07:51:00.530Z",
  capacity: 10,
  currentSize: 4,
  currentActivity: "Ordering",
  completedStatus: false,
  createdAt: "2015-09-09T17:15:19.205Z",
  distance: 189.85958992065562,
  updatedAt: "2015-09-09T17:15:19.205Z",
  hostId: 3,
  locationId: 9,
  Location: {
    <LOCATION INFORMATION> 
  },
}]
```

###POST request
Creates a new event

#### Required request body
- hostId
- locationId
- plannedTime
- capacity
- currentSize

#### Optional request body
- currentActivity

#### Example request
```javascript
{
  hostId: 1,
  locationId: 1,
  plannedTime: (new Date(2015, 8, 2, 19, 30)).toISOString(),
  capacity: 10,
  currentSize: 4,
  currentActivity: 'Ordering',
  completedStatus: false
}
```

## /events/:id
###GET request
Gets details about an event

#### Example request
/events/1

#### Response Format 
```javascript
{
  id: 1,
  plannedTime: "2015-09-28T21:19:23.204Z",
  capacity: 10,
  currentSize: 4,
  currentActivity: "Ordering",
  completedStatus: false,
  createdAt: "2015-09-09T17:15:19.199Z",
  updatedAt: "2015-09-09T17:15:19.199Z",
  hostId: 2,
  locationId: 1,
  Location: {
    <INFORMATION ABOUT Location>
  },
  Users: [ <USER OBJECTS> ]
}
```

###POST request
Modifies an event

#### Request body
- The elements of an event you want to change

#### Example request
```javascript
tbd
```

## /events/:id/join
###POST request
Creates new request for a user to join an event

#### Response format
Returns a 200 if the user was able to request ot join

## /events/:id/approve
###PUT request
Allows hosts to approve or reject users that requested to join their event

### Required request body
- user: userid 
- approved: true/false

#### Example request
```javascript
{ user: 3, 
  approved: true }
```

#### Response format
Returns a 200 if the approval/rejection went successfully, 403 if the user is not the host, and 400 if there's a missing field from the body.

## /events/:id/status
###PUT request
Updates a user's status message for a certain event

### Required request body
- status: string

#### Example request
```javascript
{ status: 'walking over'}
```

#### Response format
Returns a 200 if the update went successfully, 400 if the user is not a participant in this event.

## /users/login
Logs a user in

#### Required request body
- username
- password

#### Response format
If username is not found, will return 301. If successful login, will return 200, and otherwise, will return 404.

## /users/signup
Creates a new user

#### Required request body
- username
- password
- email
- status

#### Optional 
- profileImageUrl
- interests
- description
- connectedToFacebook

#### Example request
/users/signup
```javascript
{
  username: "test",
  password: "password",
  email: "test@test.com",
  profileImageUrl: "http://www.google.com/",
  interests: [],
  description: "Most awesome guy ever",
  status: "online",
  connectedToFacebook: false
}
```

## /users/:id
###GET request
Gets detailed information about a user

#### Example request
/users/2/

#### Response Format 
```javascript
{
  id: 2,
  username: "Augusta_Torp",
  password: null,
  email: "Willard46@hotmail.com",
  profileImageUrl: "http://lorempixel.com/640/480",
  interests: null,
  description: null,
  status: "Use the redundant RSS transmitter, then you can program the redundant transmitter!",
  connectedToFacebook: null,
  createdAt: "2015-09-07T17:27:49.707Z",
  updatedAt: "2015-09-07T17:27:49.707Z"
}
```

###POST request
Modifies a user 

#### Required request body
- The elements of a user you want to change

#### Response Format 
```javascript
tbd
```

## /users/:id/reviews

###GET request
Gets the reviews for a given user

#### Example request
/users/2/reviews 

#### Response Format 
```javascript
{
  averageRating: 3.5,
  reviews: [
  { authorId: 1,
    starRating: 3,
    text: "Great person",
    createdAt: "2015-09-07T17:27:49.707Z"
  },
  { authorId: 4,
    starRating: 4,
    text: "Very friendly",
    createdAt: "2015-09-07T17:27:49.707Z"
  }]
}
```

###POST request
Writes a new review for a user

#### Required request body
- eventId: Identifier for the event that the review is pertaining to
- starRating: Integer from 1-5
- text: Text description of the rating 

#### Example request
/users/2/reviews
```javascript
{
  eventId: 1,
  starRating: 3,
  text: "Was late to the event"
}
```

