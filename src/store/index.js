import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //the idCount gives the id of each product, it is a manually increment property
        idCount: 0,
        user: {},
        products: []
    },
    mutations: {
        // add a product
        addProduct(state, product) {

            // add the product to the product List
            state.products.push({
                id: state.idCount,
                ...product
            })
            // increment the idCount
            state.idCount++
        },

        // update a product
        updateProduct(state, product){
            const intermediateProductList = state.products.filter(prod => prod.id != product.id)
            state.products = intermediateProductList.concat([
                product
            ])
        },

        // delete a product

        deleteProduct(state, idProduct){
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
