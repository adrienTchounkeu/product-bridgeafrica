<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary" class="px-5 mt-0">
			<b-navbar-brand href="#" class="mr-5">Product Management</b-navbar-brand>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			
			<b-nav-form>
				<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
				<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
			</b-nav-form>
			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					
					<b-nav-item-dropdown :text=username right class="text-white">
						<b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<b-card>
			<div>
				<b-button variant="outline-primary" @click="createUserMode">
					<b-icon icon="plus" aria-hidden="true"></b-icon>
					Create a new product
				</b-button>
			</div>
			<b-modal id="createUserModal" :title="modalHeaderText" v-model="createOrUpdateUserModal">
				<p>
					<b-form-group class="input-wrapper text-center">
						<b-img :src=productImage alt="Image" id="img" class="mb-2"></b-img>
						<b-container class="px-xl-5 px-lg-3 px-md-1">
							<b-button variant="secondary" class="mr-1" @click="$refs.fileInput.click()">
								<i class="icon-picture"></i>
								Sélectionner une photo
							</b-button>
							<b-button variant="danger" @click="clearInput" title="Supprimer la photo" v-b-tooltip.hover
							          v-if="picture">
								<b-icon icon="trash"></b-icon>
							</b-button>
							<input type="file" ref="fileInput" class="d-none" accept="image/*"
							       @change="onPictureChange" />
						</b-container>
					</b-form-group>
					<b-input-group class="mb-3">
						<template #prepend>
							<b-input-group-text>Name</b-input-group-text>
						</template>
						<b-form-input
								v-model="name"
								:state="nameState"
								aria-describedby="name-live-feedback"
						></b-form-input>
						<b-form-invalid-feedback id="name-live-feedback">
							Enter at least 3 letters
						</b-form-invalid-feedback>
					</b-input-group>
					<b-input-group prepend="Price ($)" class="mb-3">
						<b-form-input
								v-model="priceProduct"
								:state="priceState"
								aria-describedby="price-live-feedback"
						></b-form-input>
						<b-form-invalid-feedback id="price-live-feedback">
							Enter a valid price
						</b-form-invalid-feedback>
					</b-input-group>
					<b-form-textarea
							id="textarea"
							v-model="description"
							placeholder="Description of your product..."
							rows="3"
							max-rows="6"
					></b-form-textarea>
				</p>
				<template slot="modal-footer">
					<b-button variant="secondary" @click="cancel()">
						Cancel
					</b-button>
					<!-- Button with custom close trigger value -->
					<b-button variant="primary" @click="updateOrCreateProduct()">
						{{modalButtonText}}
					</b-button>
				</template>
			</b-modal>
		</b-card>
		<b-jumbotron>
			<b-container>
				<b-row>
					<b-col v-for="product in products" class="col-4" :id="product.id">
						<b-card
								:title="product.name"
								:img-src="product.picture"
								img-alt="Image"
								img-top
								tag="article"
								style="max-width: 20rem;"
								class="mb-2"
								bg-variant="light"
						>
							<b-card-text>
								{{product.price}} $
							</b-card-text>
							<b-card-text>
								{{product.description}}
							</b-card-text>
							<template #footer>
								<b-button variant="outline-primary" v-b-tooltip.hover title="Edit" class="mr-2"
								          @click="updateProduct(product)">
									<b-icon icon="pencil"></b-icon>
								</b-button>
								<b-button variant="danger" v-b-tooltip.hover title="Delete"
								          @click="deleteProduct(product)">
									<b-icon icon="trash"></b-icon>
								</b-button>
							</template>
						</b-card>
					</b-col>
				</b-row>
			</b-container>
		</b-jumbotron>
	</div>
</template>

<script>

    import {mapGetters, mapMutations} from 'vuex'

    import defaultImage from '../assets/product_example.jpg'

    export default {
        name: "Products",
        data() {
            return {
                picture: null,
                name: "",
                priceProduct: "",
                description: "",
                createOrUpdateUserModal: false,
                modalMode: 0,
                updateProductId: 0,
                submitted: false
            }
        },
        created() {
            if (!this.$store.state.user)
                this.$router.push('/login')

        },
        mounted() {},
        watch: {},
        computed: {
            nameState() {
                return this.submitted ? this.name.length > 2 : null
            },
            priceState() {
                return this.submitted ? this.priceProduct.match(/^[0-9]+([.,][0-9]+)?$/i) != null : null
            },
            username() {
                return this.$store.state.user.username
            },
            productImage() {
                return this.picture ? this.picture : defaultImage
            },
            ...mapGetters({
                products: 'productsList'
            }),
            ...mapMutations([
                'addProduct'
            ]),
            modalHeaderText() {
                return this.modalMode ? "Update a Product" : "Create a new Product"
            },
            modalButtonText() {
                return this.modalMode ? "Update Product" : "Create Product"
            },
        },
        methods: {

            onPictureChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                const reader = new FileReader();
                const vm = this;

                reader.onload = (e) => {
                    vm.picture = e.target.result;
                };
                reader.readAsDataURL(files[0]);
            },
            clearInput() {
                this.picture = null
            },
            createUserMode() {
                this.modalMode = 0
                this.createOrUpdateUserModal = true
            },
            createProduct() {
                this.$store.commit('addProduct', {
                    name: this.name,
                    price: this.priceProduct,
                    description: this.description,
                    picture: this.picture ? this.picture : defaultImage
                })
            },
            updateProduct(product) {
                this.modalMode = 1
                this.createOrUpdateUserModal = true
                this.name = product.name
                this.price = product.price
                this.description = product.description
                this.picture = product.picture
                this.updateProductId = product.id

            },
            updateOrCreateProduct() {
                this.submitted = true
                if (!(this.name.length && this.priceProduct.match(/^[0-9]+([.,][0-9]+)?$/i) != null))
                    return

                if (this.modalMode) {
                    this.$store.commit('updateProduct', {
                        name: this.name,
                        price: this.priceProduct,
                        description: this.description,
                        picture: this.picture ? this.picture : defaultImage,
                        id: this.updateProductId
                    })
                } else {
                    this.createProduct()
                }

                this.createOrUpdateUserModal = false
            },
            deleteProduct(product) {
                this.$store.commit('deleteProduct', product.id)
            },
            logout() {
                this.$store.commit('logoutUser')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
	
	#img{
		max-height: 150px;
		max-width: 200px;
		object-fit: cover;
	}
	
	.card-img-top{
		height: 200px;
		object-fit: cover;
	}
</style>