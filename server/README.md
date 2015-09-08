# Internal API 

## Summary

- /locations
- /events 
- /events/:id
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

#### Required urls params 
#### Optional urls params 
#### Example request
#### Response Format  

## /events/:id

#### Required urls params 
#### Optional urls params 
#### Example request
#### Response Format 

## /users/login

#### Required request body
- username
- password

#### Response format
If username is not found, will return 301. If successful login, will return 200, and otherwise, will return 404.

## /users/signup

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

#### Required request body
#### Example request
#### Response Format 
```javascript
```

## /users/:id/reviews

###GET request

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

