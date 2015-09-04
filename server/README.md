# Internal API 

## Summary

- /locations
- /events (get)
- /events (post)
- /users

## /locations 

#### Required urls params 
latitude : latitude of user's position
longitude : longitude on user's position

#### Optional urls params 
q : search term for querying foursquare
radius : max distance from current location for searching for venues

#### Example request
/locations?latitude=37.7837209&longitude=-122.4090445&q=donuts

#### Response Format  
```{locations: [
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
tags: [
"Donut Shop"
],
coords: {
latitude: 37.791704,
longitude: -122.420935
}
}]}```

## /events 

## /users