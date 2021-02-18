import Vue from 'vue'
import Vuex from 'vuex'
import defaultImage from '../assets/product_example.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //the idCount gives the id of each product, it is a manually increment property
        productIdCount: 1,
        user: "",
        products: [
            {
                id: 0,
                name: "Chocolat Blanc",
                price: 100,
                description: "Je suis un chocolat blanc",
                picture: defaultImage
            },
        ]
    },
    mutations: {

        logoutUser(state) {
            state.user = ""
        },
        // add a User
        addUser(state, user) {
            state.user = user
        },

        // add a product
        addProduct(state, product) {

            // add the product to the product List
            state.products.push({
                id: state.productIdCount,
                ...product
            })
            // increment the idCount
            state.productIdCount++
        },

        // update a product
        updateProduct(state, product) {
            const intermediateProductList = state.products.filter(prod => prod.id != product.id)
            state.products = intermediateProductList.concat([
                product
            ])
        },

        // delete a product

        deleteProduct(state, idProduct) {
            state.products = state.products.filter(prod => prod.id != idProduct)
        }

    },
    getters: {

        // display the product list
        productsList: state => {
            return state.products
        },

        // display a product information
        productInfo: (state) => (id) => {
            return state.products.find(prod => prod.id == id)
        }
    },
    actions: {},
    modules: {}
})
