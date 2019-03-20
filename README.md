# The task

Build a service in node that exposes an API which can be consumed from any client. This API must check h ow many video streams a given user is watching and prevent the user from watching more than 3 streams concurrently.

# To run

### Must have Docker installed

In a terminal run the following;

- docker-compose up

This will create a container than contains the node express api and a mongodb image and will expose a port in order to interact with the API end points.

# To view

In order to interact with the API i would recommend using postman.
I've included an exported postman collection in the root directory that can be used to hit the API endpoints.

## API End points

| url             | method  | action                            |
| -------------   |:-------:| ---------------------------------:|
| /stream         | GET     | Gets all current streams          |
| /user           | GET     | Gets all current users            |
| /stream/add     | POST    | Generates a stream for a user     |
| /user/add       | POST    | Generates a new user              |
| /getStreamCount | POST    | Returns a stream count for a user |
| /user           | DELETE  | Deletes a user                    |
| /stream         | DELETE  | Deletes a stream                  |

# Scalability

You could deploy the service to a docker swarm and scale the number of containers accordingly.

# Future improvement / didn't complete

- include a test suite