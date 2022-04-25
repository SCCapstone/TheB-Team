<template>
    <div class="user">
        <hr>
        <h1>User</h1>
        <hr>
        <div v-if="!signIn && !changePass" class="email">
            <label v-if="edit" class="email-label">Email: </label>
            <input v-if="edit" class="email-label" placeholder="Email address..." v-model="newEmail">
            <button v-if="!edit" class="email-button" @click="editUserEmail">Change Your Email</button>
            <button v-if="edit" class="email-button" :disabled="!newEmail" @click="submit">Submit</button>
            <button v-if="edit" class="button2__extra" @click="cancel">Cancel</button>
        </div>
        <span v-if="!signIn" style="color: red">{{ error }}</span>
        <div v-if="!signIn && !edit">
            <button v-if="!changePass" @click="editPassword">Change Your Password</button>
            <form v-if="changePass" @submit.prevent="submitPassword">
                <div class="form-group">
                    <label>New Password</label>
                    <input type="password" 
                    placeholder="password..."
                    class="form-control form-control-lg" 
                    v-model="newPassword" />
                </div>

                <div class="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" 
                    placeholder="password..."
                    class="form-control form-control-lg" 
                    v-model="confirmation" />
                </div>

                <button type="submit" class="btn btn-dark btn-lg btn-block" :disabled="newPassword.length === 0 || newPassword !== confirmation">Submit</button>
                <button class="button2" @click="cancel">Cancel</button>
            </form>
            
        </div>
        <div v-if="signIn">
          <form @submit.prevent="login">
            <h3>Before you change your user info, we need you to re-login.</h3>

            <div class="form-group">
                <label>Email address</label>
                <input
                  placeholder="Email address..." 
                  class="form-control form-control-lg" 
                  v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" 
                  placeholder="password..."
                  class="form-control form-control-lg" 
                  v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            
          </form>
          <span style="color: red">{{ error }}</span>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data () {
        return {
            email: '',
            newEmail: '',
            edit: false,
            signIn: false,
            changePass: false,
            error: '',
            user: {
                email: '',
                password: ''
            },
            newPassword: '',
            confirmation: ''
        }
    },
    methods: {
        editUserEmail() {
            this.signIn = true;
            this.newEmail = this.email;
            this.edit = true;
        },
        editPassword() {
            this.signIn = true;
            this.changePass = true;
        },
        cancel() {
            this.error = '';
            this.edit = false;
            this.changePass = false;
            this.newEmail = '';
        },
        submit() {
            this.error = '';
            const user = firebase.auth().currentUser;
            user.updateEmail(this.newEmail)
            .then(() => {
                this.newEmail = '';
                this.edit = false;
            })
            .catch(e => {
                this.error = 'Something went wrong. Please try again!';
                console.log(e);
            });
        },
        submitPassword() {
            this.error = '';
            const user = firebase.auth().currentUser;
            user.updatePassword(this.newPassword)
            .then(() => {
                this.newPassword = '';
                this.confirmation = '';
                this.changePass = false;
            })
            .catch(e => {
                this.error = 'Something went wrong. Please try again!';
                console.log(e);
            });
        },
        login() {
            this.error=''
            firebase
            .auth()
            .signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(() => {
                this.email = this.user.email;
                console.log(this.email);
                this.user.email = '';
                this.user.password = '';
                this.signIn = false;
            }).catch((error) => {
                this.error = error;
            });
        }
    }
}
</script>

<style scoped>
    .email {
        position: relative;
        height: 40px;
        width: 100%;
    }
    .email-label {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        float: left;
    }
    .email-button {
        position: relative;
        top: 45%;
        transform: translateY(-50%);
    }
    .button2__extra {
        background-color: red;
        border: 2px solid black;
        border-radius: 10px;
        color: white;
        padding: 2px 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 2px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.1s;
        transition-duration: 0.1s;
        position: relative;
        top: 45%;
        transform: translateY(-50%);
    }
</style>
