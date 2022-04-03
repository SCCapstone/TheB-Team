<template>
  <div>
    <div>
    <hr>
    <h1>Log in/Sign up</h1>
    <hr>
    </div>

    <div>
          <div>

          <form @submit.prevent="login">
            <h3>Sign In</h3>

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

        <div>
          <p class="forgot-password text-right mt-2 mb-4">
                <span class="link" @click="goToForgotPassword">Forgot password?</span>
            </p>
        </div>

        <div>
          <p class="forgot-password text-right mt-2 mb-4">
                <span class="link" @click="goToRegister">No account? Register here</span>
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
      },
      error: ''
    }
  },
  created() {
    this.logout();
  },
  methods: {
  
    login() {
        this.error=''
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/');
        }).catch((error) => {
            this.error = error;
        });
    },
    
    logout() {
      firebase
        .auth()
        .signOut()
    },
    goToRegister() {
      this.$router.push('/TheB-Team/register')
    },
    goToForgotPassword() {
      this.$router.push('/TheB-Team/forgotpassword')
    }
  }
}
</script>

<style scoped>
.link {
     cursor:pointer;
     color:blue;
     text-decoration:underline;
}
</style>