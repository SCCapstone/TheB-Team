<template>
  <div>
    <div>
    <hr>
    <h1>Log in/Sign up</h1>
    <hr>
    </div>

    <div>
          <div v-if="isLoggedIn">

          <form @submit.prevent="login">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email"
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
        </div>

        <div v-if="!isLoggedIn">
          <button @click="logout">Logout</button>
        </div>

        <div v-if="isLoggedIn">
          <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/TheB-Team/forgotpassword">Forgot password ?</router-link>
            </p>
        </div>

        <div v-if="isLoggedIn">
          <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/TheB-Team/register">No account? Register here</router-link>
            </p>
        </div>
  </div>

  </div>

</template>

<script>
import firebase from 'firebase';

export default {
  name: 'LoginSignup',
    data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
  
    login() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    
    logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert('Successfully logged out');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
    }
}
</script>