<template>
    <h1>Register</h1>
    <div>
          <div>
            <form>
                <input
                    type="email"
                    placeholder="Email address..."
                    v-model="user.email"
                />
                <br>
                <input
                    type="password"
                    placeholder="password..."
                    v-model="user.password"
                />
                <br>
                <button @click="register">Register</button>
            </form>
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
            }
        
        }
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.user.email, this.user.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/TheB-Team/loginsigngup');
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    }
}
</script>