<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { decodeCredential } from 'vue3-google-login'
import { useCookies } from 'vue3-cookies'

const review = ref({})
const reviewsBe = ref([])
const { cookies } = useCookies()
let isLoggedIn = ref(false)

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

const checkSession = () => {
    if( cookies.isKey('user_session')){
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        console.log(userData.given_name)
        if(userData.given_name === review.value.author){console.log("it is!")}
        else{console.log(userData.given_name)
        console.log(review)}
        
    }
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
function navigateToUpdate(reviewId){
    router.push(`/review/update/${reviewId}`);
}

onMounted(checkSession)
</script>

<template>
    <h1>Author is: {{ review.author?.googleName }}</h1>
    <p>{{ review.reviewBody }}</p>
    <button @click="deleteReview(review._id)" class="btn btn-primary"> Delete Me</button>
    <button @click="navigateToUpdate(review._id)" class="btn btn-primary">Maybe edit?</button>
</template>