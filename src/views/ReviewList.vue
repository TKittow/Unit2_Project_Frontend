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
    <div class="grid-container">
        <div v-for="review in reviewBe" :key="review.id" class="frame">
            <div class="card" style="width: 18rem;">
                <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img-top" alt="...">
                <div class="card-body">
                    <p>Author: {{ getUserNameById(review.author) }}</p>
                    <h5 class="card-title">{{ review.location }}</h5>
                    <p class="card-text">{{ review.reviewBody }}</p>
                    <RouterLink :to="'/review/'+review._id" class="btn btn-primary">Open in Full</RouterLink>
                </div>
            </div>
        </div>
    </div>
    
</template>