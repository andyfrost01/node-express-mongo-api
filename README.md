# The task

Build a service in node that exposes an API which can be consumed from any client. This API must check how many video streams a given user is watching and prevent the user from watching more than 3 streams concurrently.

# To run

### Must have Docker installed

In a terminal run the following;

- docker-compose up

This will create a container than contains the node express api and a mongodb image and will expose a port in order to interact with the API end points.

This will also run the test suite which is written using chai and mocha.

## tests

| test desc                                                            | action                  |
| ---------------------------------------------------------------------|------------------------:|
| it should GET all the streams                                        | Gets all current streams|
| it should create a stream and return the new stream object           | Creates a stream  |
| it shouldn't create a stream if the user already has three streams and return a too many streams error | Tries to create a fourth stream for a user                                   |
| it should return a stream count for a user| Returns a stream count for a user             |
| it should delete a stream and return success message| Delete a stream |
| it should fail to delete a stream and return no valid stream message           | Attempts to delete a stream that doesn't exist |
| it should GET all the users        | Gets all current users                 |
| it should create a user and return the new users object | Creates a user |
| it should delete a user and return success message | Delete a user |
| it should fail to delete a user and return no valid user message | Attempts to delete a user that doesn't exist |

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

# Future improvement / didn't complete due to time

- Improve test suite
- Git commit pattern wasn't consistent
- Implement authentication
- Implement better validation
- I would update the api to use GraphQl