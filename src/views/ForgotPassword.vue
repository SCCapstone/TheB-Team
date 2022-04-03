<template>
    <div>
        <form>
            <h3>Forgot Password</h3>
            <div>
                <input
                    placeholder="Email address..."
                    v-model="user.email"
                />
            </div>
            <button @click="forgetPassword">Reset password</button>
        </form>
        <span style="color: red">{{ error }}</span>
        <span>{{ success }}</span>
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
            },
            error: '',
            success: ''
        }
    },
    methods: {
        forgetPassword() {
            firebase
            .auth()
            .sendPasswordResetEmail(this.user.email)
            .then(() => {
                this.error = '';
                this.user = {   
                    email: ''
                }
                this.success = 'An email has been sent to your account!'
            }).catch((error) => {
                this.error = error;
            });
        },
  }
}
</script>