<script setup>

import router from '@/router';
import { onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()
let userName =  ref('')
const userEmail = ref('')

const review = ref({
    location: '',
    googleMapsLink: '',
    rating: '',
    author: '',
    reviewBody: ''
})

const checkSession = () => {
    if( cookies.isKey('user_session')){
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
        userEmail.value = userData.email
    }
}

const addReview = async () =>{

    review.value.author = userEmail.value
    console.log(review.value.author) 
    if (review.value.location === '' || review.value.googleMapsLink === '' || review.value.rating === ''){
        alert('All values are required')
        return
    }
    fetch(`${import.meta.env.VITE_API_URL}/review/add`,{
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review.value)
    })
    .then(() => {
        router.replace({name: 'review'})
    })
    .catch(err => console.error(err))
}
onMounted(checkSession)
</script>

<template>
    <h3>Add a New Review</h3>
    <div class="bookForm">
        <label for="location">Location:</label>
        <input type="text" name="locaion" placeholder="E.g. 'The Cyclist'" v-model="review.location" required>
        <br/>
        <label for="text">Google Maps Link</label>
        <input type="text" name="googleMapsLink" placeholder="The Google Maps Link" v-model="review.googleMapsLink" required>
        <br/>
        <label for="rating">Rating:</label>
        <input type="number" min="0" name="rating" placeholder="5 Star Rating" v-model="review.rating" required>
        <br/>
        <label for="text">How was your night?</label>
        <br/>
        <textarea  name="reviewBody" placeholder="Enter your review here" v-model="review.reviewBody" rows="5" required></textarea>
        <br/>
        <button @click="addReview">Submit</button>
    </div>
</template>