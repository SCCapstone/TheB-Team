<template>
    <h1>Register</h1>
    <div>
          <div>
            <form>
                <label>Email address</label>
                <input
                    placeholder="Email address..."
                    v-model="user.email"
                />
                <br>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="password..."
                    v-model="user.password"
                />
                <br>
                <button @click="register">Register</button>
            </form>
            <span style="color: red">{{ error }}</span>
            </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Register',
    data() {
        return {  
            user: {
                email: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.user.email, this.user.password)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    this.error = error.message;
                });
        }
    }
}
</script>