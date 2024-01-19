<script setup>
import { ref, onMounted } from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ''

const callback = (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    userName = userData.given_name
    cookies.set('user_session', response.credential)
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email,
            googleName: userData.given_name
        })
    })
    .then(() => {
        console.log('session saved')
        window.location.reload()
    })
    .catch(err => console.error(err))
}

const checkSession = () => {
    if( cookies.isKey('user_session')){
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
        
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
    <div class="center">
    <h1 v-if="isLoggedIn === false">Please login below</h1>
    <div v-if="isLoggedIn">
        <p> Hello {{ userName }}</p>
        <p>Please click on the logo in the top left to see our reviews!</p>
        <button @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
</div>
</template>