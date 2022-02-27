<template>
  <!-- <div class="loginsignup">
    <hr>
    <h1>Log in/Sign up</h1>
    <hr>
    <h3>Log in:</h3>
    <form>
      <label>Username: </label>
      <input type="username" required>
    </form>
    <form>
      <label>Password: </label>
      <input type="password" required>
    </form>
    <button>Log in</button>
    <h3>Sign up:</h3>
    <form>
      <label>Username: </label>
      <input type="username2" required>
    </form>
    <form>
      <label>Password: </label>
      <input type="password2" required>
    </form>
    <button>Sign up</button>
  </div> -->

  <div>
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

  <div>
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
      <button @click="logout">Logout</button>
    </div>

</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Loginsignup',
    data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
       
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