<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const review = ref({})
const reviewsBe = ref([])

onMounted(() => {
    const route = useRoute()
    const id = route.params.id
    fetch(`${import.meta.env.VITE_API_URL}/review/${id}`)
    .then(response => response.json())
    .then( result => {
        review.value = result
    })
    .catch(err => console.error(err))
})

const fetchData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/review`)
    .then( response => response.json())
    .then( result => {
        reviewsBe.value = result
    })
}



function deleteReview(reviewId){
    fetch(`${import.meta.env.VITE_API_URL}/review/${reviewId}`,{ 
        method: "DELETE"
    })
    .then(()=>{
        alert('Review deleted')
        fetchData()
        router.replace({name: 'review'})
    })
    .catch(err => console.error(err))
}
</script>

<template>
    <h1>Author is: {{ review.author?.googleName }}</h1>
    <p>{{ review.reviewBody }}</p>
    <button @click="deleteReview(review._id)"> Delete Me</button>
</template>