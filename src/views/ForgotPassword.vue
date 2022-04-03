<template>
    <div>
        <form>
            <h3>Forgot Password</h3>
            <div>
                <input
                    type="email"
                    placeholder="Email address..."
                    v-model="user.email"
                />
            </div>
            <button @click="forgetPassword">Reset password</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'ForgotPassword',
    data() {
        return { 
            user: {
                email: ''
            }
        }
    },
    methods: {
        forgetPassword() {
            firebase
            .auth()
            .sendPasswordResetEmail(this.user.email)
            .then(() => {
                alert('Check your registered email to reset the password!')
                this.user = {   
                email: ''
                }
            }).catch((error) => {
            alert(error)
            });
        },
  }
}
</script>