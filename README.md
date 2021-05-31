# product-bridgeafrica

### Environment setup

The code is written in VueJS and was created using the Vue CLI. To run my code, you must first install all the modules used
to develop the small App : 
- bootstrap && bootstrap-vue :  handle the views of the app
- password-hash :  hash passwords after registration
- vue-router : create all the routes of my app
- vuex : create the store of my app

To install those modules, you need to run the command:
```
npm install
```

### Running code

To run my code, you need to run the command:
```
npm run serve
```

### Additional Context, Approach and Assumptions

This problem is totally related to Product Management. In other words, the user can Create, Read, Update and Delete products. 
After login into the App, the Home Page displays all the products and, on this same page, you can `Create a New Product`. 
Each product goes with two buttons : `Edit Product` && `Delete Product`

The persistence of the user and products, and all the actions(create, list, update, delete) are managed in the Vue Store(Vuex)

To resolve this problem, i did some hypothesis :
- The tester will not try any attack
- There is only one Registration(without no connexion) which logs you immediately
- You cannot view the list of products without no registration
- There is already one Product in the store


### Shorts-comings

My code is resolving the problem but there are some limitations :
- not handling server attacks
- not performing unit && end-to-end tests


### Things to add or refine

- create a Product component when the project will be large
- persist data in a database
- create a Backend, which communicates with the Frontend
- create a complete registration and login process for many users
- reinforce the security of the application (using web-tokens, encrypting sensible information)
- include a shopping cart and product payments

**NB:** The project is hosted on Heroku : [product-bridgeafrica](https://tranquil-plains-03356.herokuapp.com)
