<script setup>
import '@/assets/main.css'
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

const { cookies } = useCookies()

let isLoggedIn = ref(false)

const checkSession = () => {
    if( cookies.isKey('user_session')){
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        console.log(userData)
        
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
    window.location.reload()
    
}



onMounted(checkSession)
</script>

<template>
  <header>

    <div class="wrapper">

      <nav v-if="isLoggedIn === true">
        <RouterLink to="/review"><h1><span style="color: rgb(219, 210, 83);">all</span><span style="color: blueviolet;">nightr</span></h1></RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/review/add">Add A Review</RouterLink>
        <a href='#' @click="handleLogout">LogOut</a>
      </nav>
      
      <nav v-else>
        <RouterLink to='/login'> Login</RouterLink>
      </nav>
    </div>
  </header>
<div class="content">
  <RouterView />
</div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
