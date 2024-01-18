<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const reviewId = route.params.id

const review = ref({
    location: '',
    googleMapsLink: '',
    rating: '',
    author: '',
    reviewBody: ''
})

const LoadReviewData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/review/${reviewId}`)
    .then(res => res.json())
    .then(data => {
        review.value = {
            location: data.location,
            googleMapsLink: data.googleMapsLink,
            rating: data.rating,
            author: data.author,
            reviewBody: data.reviewBody
        }
    })
}

const updateReview = () => {
    fetch(`${import.meta.env.VITE_API_URL}/review/${reviewId}`, {
        method: "PUT",
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

onMounted(LoadReviewData)
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
        <button @click="updateReview">Submit</button>
    </div>
</template>