# regal-credit-api V1.0.0


## Please follow the procedure in sequence.


1. Clone the project file and place it on your local repository.

2. In the project directory you can run  `npm install` to install all         packaged dependencies.

3. In the **.env** file on the root directory, you can change the value of the PORT with your desired port number. I initialized it to 3002 or 3000.

4. Run `npm start` on the terminal 

5. Run `tsc -w` on the terminal for typescript to compile.

## API ENDPOINTS

### METHOD: GET
## http://localhost:3002/color-animal/all

1. Send request to the endpoint above to get the list of all colors and animals currently saved on the backend.

2. If there are no existing data on the backend, it will send an object

        {"colorsANdAnimals": 0}

### METHOD: GET
## http://localhost:3002/color-animal/random

1. Send request to the endpoint above to get a random tuple of colors and animals.

2. If there are no existing data on the backend, it will send an object

        {"colorsANdAnimals": 0}

### METHOD: POST 
## http://localhost:3002/color-animal/add

1. Send request to the endpoint above to add a list of tuples of colors and animals to the  backend data. You can send a request body in two form, one array for multiple addition, or just an object for single addition.

Ex. For multiple addition

    [
        {
        "animal": "Pig",
        "color": "Pink"
        },
        {
        "animal": "Carabao",
        "color": "Black"
        }
    ]

Ex. For single addition
    
    {
        "animal": "Pig",
        "color": "Pink"
    }

2. Validation of request body are:
    
    - an object should have an animal and color property
    - the animal and color property should be of of type string
    - the animal and color property should not be an empty string

if one of the requirements above wasn't met it will return a status 400 with object

    {"requestIsValid": false}

### METHOD: POST
## http://localhost:3002/color-animal/edit

1. Send request to the endpoint above to update an object or array of object
   using "uuid" as unique element. you can pass an array or an object as well.

Ex. For multiple edit

        [
            {
                "uuid": "431207e5-355f-441a-9659-3675018ae2bd",
                "color": "Pink",
                "animal": "Turtle"
            },
            {
                "uuid": "63d087aa-c0e9-4c95-bc83-a7c6cad9b422",
                "color": "Yellow",
                "animal": "Pig"
            }
        ]

Ex. For single edit

        {
            "uuid": "431207e5-355f-441a-9659-3675018ae2bd",
            "color": "Pink",
            "animal": "Turtle"
        }

2. Validation of request body are:
    
    - an object should have an animal and color property as well as the uuid.
    - the animal, color and uuid property should be of of type string
    - the animal, color, and  uuid property should not be an empty string

if one of the requirements above wasn't met it will return a status 400 with object

    {"requestIsValid": false}

### METHOD: DELETE
## http://localhost:3002/color-animal/delete

1. Send request to the endpoint above to delete an object or group of object having the uuids as elements of an array.

Ex. To delete a single or multiple object use the request body below

    {
        "uuids": ["13535322", "4c7ad360-7103-44ec-b9e4-07ad48a3a0c9"]
    }

## Additional Feature


1. There is a middleware that catches every request that are not registered on
    the route list and returns 404 with resourceNotFound object.

    Example of bad request

    http://localhost:3002/color-animfsasdfdassfsdf

    if you try to send request on the link above, it will return

        {
            "resourceNotFound": true
        }

2. There is also a general server error middleware wherein if something happens, let's say accessing a data that don't exist or any other error
that will possibly occur on the backend will send back a status 500 and generalServerError object.

        {
            "generalServerError": true
        }



### Tech Stack and Tools Used

1. Node/Express JS
2. Typescript
3. Nodemon
4. UUID
5. Body Parser
6. POSTMAN for testing

## Additional Questions

1. How long it took you to complete the work
    - Once I understand what was required, it took me 4 hours to produce the code.

2. What you had to research to complete the work
    - It's my first time to work with tuples. Though I know what it is, array is my goto when building data, I need to work my head up to understand the requirements of tuples before starting the exam.

3. If you did use a database for this project, what kind would you use and why?
    - I think I will go for nosql databases particularly mongodb for it is easier to save complex data types(in this case the tuple) on a document/collection base db rather than sql.

4. Can you give me an example of how you would delete a color from the database?

    - On a mongodb collection and using the mongoose package, if you already defined your model lets say 
            
            import mongoose from "mongoose";
            export interface IColor extends mongoose.Document {  
                color: string;
            }
  
            export const colorSchema = new mongoose.Schema({
                color: {
                    type: String,
                    required: [true, color required]
                }
            }}

            export const Color = mongoose.model<IColor>('Color', colorSchema);

    Then on your controller
            
            import Color from './where the model was located'
            import { RequestHandler } from "express";

            const deleteColor: RequestHandler = async (req, res, next) => {

                const deleteColor = await findOneAndDelete({color: "Red"});
                //return code here
            } 
            export default {
                deleteColor
            }
            

    Alternatively, on a SQL database considering everything was already setup and you have a table colors with column color_name, you can run the following code.

        DELETE FROM colors WHERE color_name = "Red";


NOTE: I also saved the postman collection on the root directory for your referrence(rcm-endpoints.postman_collection.json)

       

