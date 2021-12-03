<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/loginsignup">Log in/Sign up</router-link> |
    <router-link to="/trucklist">Truck List</router-link> |
    <router-link to="/routelist">Route List</router-link> |
    <router-link to="/truckdetails">Truck Details</router-link> |
    <router-link to="/routedetails">Route Details</router-link> |
    <router-link to="/gps">GPS</router-link> |
    <router-link to="/calculator">Calculator</router-link> |
    <router-link to="/rulesregulations">Rules/Regulations</router-link>
  </div>
  <router-view/>

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #105B3D;
}

#nav a.router-link-exact-active {
  color: #499375;
}
</style>

<script>
export default {
  name: 'app',
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
        
      
  }
    



</script>
