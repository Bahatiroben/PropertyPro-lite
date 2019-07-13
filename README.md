# PropertyPro-lite
Property Pro Lite is a platform where people can create and/or search properties for sale or rent
______________________________________________________________________________________________________-

Property Pro is a platform that helps users find, rent and buy proerties eality

I have already upload the UI template for this project on github and if you want to have a look follow this [link](https://bahatiroben.github.io/PropertyPro-lite/)

Here is a list of all API Endpoints that you will find:
* **GET/property** Fetch all available properties
* **GET/propery/:propertyid** fetches a specific property basing on its id
* **delete/property/:propertyid** deletes a specific property
* **POST/property** Create a property
* **GET/property/?type=anytype** Fetch a specific property by type
* **patch/property/propertyId** updates a property
* **patch/ property/:propertyId/flag** flags the property
* **patch/property/:propertyId/sold** marks the property as sold or available 
* **post/signup** creates a user
* **post/signin** logs in a user

# Technology Tools used
* Server-side Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** with **Chai**

# Additional Tools
* JavaScript Es6 with **Babel** transpiler
* TravisCI for Continous Integration
* nyc for test coverage
* CodeClimate and Coveralls for badges
* Heroku for Deployment

The url of the app on heroku is this one [https://propertylite.herokuapp.com/](https://propertylite.herokuapp.com/).

This is the list of all routes as on the **heroku deployment**:
* Fetch all properties  [https://propertylite.herokuapp.com/api/v1/property](https://propertylite.herokuapp.com/api/v1/property)
* Fetch a specific property [https://propertylite.herokuapp.com/api/v1/property/:propertyId](https://propertylite.herokuapp.com/api/v1/property/:<propertyId>)
* Fetch all properties by a specific type [https://propertylite.herokuapp.com/api/v1/property/?type=placeholder](https://propertylite.herokuapp.com/api/v1/property/propertyId)
* delete the specific property advert [https://propertylite.herokuapp.com/api/v1/property/id](https://propertylite.herokuapp.com/api/v1/property/propertyId)
* update property [https://propertylite.herokuapp.com/api/v1/property/id]([https://propertylite.herokuapp.com/api/v1/property/id)
* mark as sold [https://propertylite.herokuapp.com/api/v1/property/id]([https://propertylite.herokuapp.com/api/v1/property/id)
* sign up [https://propertylite.herokuapp.com/api/v1/auth/signup]([https://propertylite.herokuapp.com/api/v1/auth/signup)
* sign in [https://propertylite.herokuapp.com/api/v1/auth/signin]([https://propertylite.herokuapp.com/api/v1/auth/signin)

For a better test you will need to use [POSTMAN](https://www.getpostman.com/)
# Setup Instruction
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)

For getting the files into your local machine open git bash and do git clone with repository url

```
$ git clone https://github.com/Bahatiroben/PropertyPro-lite.git
```
Navigate to the folder containing all code files by typing cd folder_name

```
$ cd PropertyPro-lite
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
```

