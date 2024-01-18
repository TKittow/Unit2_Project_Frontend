<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'


const reviewBe = ref([])
const userBe = ref([])
const { cookies } = useCookies()
const userName = ref('')
let isLoggedIn = ref(false)

const fetchReviewData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/review`)
    .then( response => response.json())
    .then( result => {
        reviewBe.value = result
    })
}

const fetchUserData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/user`)
    .then( response => response.json())
    .then( result => {
        userBe.value = result
    })
}

const checkSession = () => {
    if( cookies.isKey('user_session')){
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

const getUserNameById = (userId) => {
    const user = userBe.value.find(user => user._id === userId)
    return user ? user.googleName : 'Unknown User'
}

onMounted(() => {
    fetchReviewData()
    fetchUserData()
    checkSession()
})

</script>

<template>
    <div v-for="review in reviewBe" :key="review.id" class="frame">
        <div><hr></div>
        <div class="username">
            <p>Author: {{ getUserNameById(review.author) }}</p>
        </div>
        <div class="location">
            <RouterLink :to="'/review/'+review._id">{{ review.location }}</RouterLink>
        </div>
        <div class="stars">
            <p>{{ review.rating }}</p>
        </div>
        <div class="map">
            <p>googleMapsLink</p>
        </div>
        <div class="reviewActual"></div>
        <div>
            <hr>
        </div>
    </div>
    
</template>