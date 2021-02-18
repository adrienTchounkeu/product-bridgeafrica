<template>
	<div>
		<b-jumbotron class="parent-login" header="Sign Up">
			<b-row class="mb-1 mt-5">
				<b-col sm="2">
					<label for="username">Name:</label>
				</b-col>
				<b-col sm="10">
					<b-form-input
							id="username"
							v-model="username"
							placeholder="Enter your name"
							:state="usernameState"
							aria-describedby="username-live-feedback"
					>
					</b-form-input>
					<b-form-invalid-feedback id="username-live-feedback">
						Enter at least 3 letters
					</b-form-invalid-feedback>
				</b-col>
			</b-row>
			<b-row class="my-4">
				<b-col sm="2">
					<label for="email">Email:</label>
				</b-col>
				<b-col sm="10">
					<b-form-input
							id="email"
							v-model="email"
							placeholder="Enter your email" type="email"
							:state="emailState"
							aria-describedby="email-live-feedback"
					>
					</b-form-input>
					<b-form-invalid-feedback id="email-live-feedback">
						Enter a valid email address
					</b-form-invalid-feedback>
				</b-col>
			</b-row>
			<b-row class="my-1">
				<b-col sm="2">
					<label for="password">Password:</label>
				</b-col>
				<b-col sm="10">
					<b-form-input id="password" v-model="password" placeholder="Enter your password"
					              type="password"></b-form-input>
				</b-col>
			</b-row>
			<b-button variant="primary" href="#" class="mt-3" @click="register">Register</b-button>
		</b-jumbotron>
	</div>
</template>

<script>
    import passwordHash from 'password-hash'

    export default {
        name: "Login",
        data() {
            return {
                username: "",
                email: "",
                password: "",
                submitted: false,
            }
        },
        created() {},
        mounted() {},
        watch: {},
        computed: {
            usernameState(){
                return this.submitted ? this.username.length > 2 : null
            },
            emailState(){
                return this.submitted ? this.email.match(/^[a-z0-9_.]+@[a-z0-9_\-]+\.[a-z]{2,12}$/i) != null : null
            },
        },
        methods: {
            register() {
                //    check if the informations are well entered
					
	            this.submitted = true
	            if(!(this.username.length && this.email.match(/^[a-z0-9_.]+@[a-z0-9_\-]+\.[a-z]{2,12}$/i) != null))
	                return
				
                // hash the password benpmfore saving
                this.$store.commit('addUser', {
                    username: this.username,
                    email: this.email,
                    password: passwordHash.generate(this.password)
                })
                this.$router.push('/products')

            }
        }
    }
</script>

<style scoped>
	.parent-login{
		margin: 0 350px;
	}
</style>