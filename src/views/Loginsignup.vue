<template>
  <div>
    <div>
    <hr>
    <h1>Log in/Sign up</h1>
    <hr>
    </div>
    <div v-if="!showLogin">
        <form @submit.prevent="register">
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit">Register</button>
        </form>
    </div>

  <div v-if="showLogin">
        <form @submit.prevent="login">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit">Login</button>
        </form>
    </div>

    <div>
      <button @click="show">{{ toggleText }}</button>
    </div>

    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>

</template>

<script>
import firebase from 'firebase';

export default {
  name: 'LoginSignup',
    data () {
    return {
      email: '',
      password: '',
      showLogin: true,
      toggleText: 'Register'
    }
  },

  methods: {
    show() {
      if (this.toggleText !== 'Login') {
        this.toggleText = 'Login';
      } else {
        this.toggleText = 'Register';
      }
      this.showLogin = !this.showLogin
    },
         register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully logged in');
                    this.$router.push('/dashboard');
                })
                .catch(error => {
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
  /*props: {
    msg: String
  }*/
}
</script>