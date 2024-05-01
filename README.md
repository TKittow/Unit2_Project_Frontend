# ReadMe allnightr

![allnightr](https://github.com/TKittow/Unit2_Project_Frontend/blob/main/src/assets/Project%202%20-%20Final%20Product.png)

### Description

I created a website using Vue, Javascript, CSS, HTML, Express and Vite. This project was due on the 12th of January 2024.


### Links

[Github Frontend](https://github.com/TKittow/Unit2_Project_Frontend)
[Github Backend](https://github.com/TKittow/Unit2_Project_Backend)

[Deployment link](https://dainty-kitten-8d0056.netlify.app)


### Timeframe & Working Team (Solo/Pair/Group)

We had a week to complete this project (in tandem with the backend) ending on the 12th of January 2024.



### Technologies Used

* JavaScript
* Vue.js
* CSS
* HTML
* Postman
* Git
* GitHub
* Google Login
* Vue
* Mongoose
* MongoDB
* Node.js



### Brief

Create a working React App that uses two sets of data.


### Build/Code Process

###### Backend

I started by fleshing out my backend. I created two schemas. One for the users and the other for the reviews. I knew I would need to link the review to the user that created it so I stored it in the database as the object ID of the user. This would allow me to display all information on one search for future features.

```
const reviewSchema = new mongoose.Schema({
    location: String,
    googleMapsLink: String,
    rating: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewBody: String,
})

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    googleName: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true
    }
})
```
I then started working on the endpoints I knew I needed (CRUD for the reviews and a couple for the user).

###### Frontend

I started by creating the HomeView.vue file within my views folder. Mainly to test the backend and frontend were cooperating with each other.

I then started working on the Google Sign-In API into my website as the login function. I imported decodeCredential and googleLogout from vue3-google-login and imported cookies from vue3-cookies. The combination of these would allow me to use the Google Login and store the information as a cookie (thereby making the login information accessible to the browser as locally stored data). I then created a logout function which would change the state of the variable ‘isLoggedIn’ to false and delete the locally stored cookie:

```
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
```
I then created a simple navbar to hold the paths I wanted to use:
* ‘/review’ - where you could view the list of reviews created
* ‘/about’ - a simple about page to give the website a bit of flavour
* ‘/review/add’ - to add a review
* Logout - uses the handleLogout function
* ‘/login’ - logs the user in

As logging in and logging out out are dependant on the state of the isLoggedIn function, I decided to use and if, else clause to only show a ‘login’ header if the user is not logged in, and all the content and a ‘Logout’ option if the user is not.

```
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
```


Once this had been sorted I then started padding out the pages I would need as of the CRUD functionality I needed for the reviews:
* NewReview.vue (component)
* ReviewEdit.vue
* ReviewList.vue
* SingleReviewView.vue


Since the ‘author’ of each review is stored as an object ID, I would need to fetch the associated name stored within the user data within Atlas. 

```
const getUserNameById = (userId) => {
    const user = userBe.value.find(user => user._id === userId)
    return user ? user.googleName : 'Unknown User'
}
```

```
const fetchUserData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/user`)
    .then( response => response.json())
    .then( result => {
        userBe.value = result
    })
}
```

I then used a v-for to iterate over the reviewBe variable to get each individual review where the getUserNameById function is called to get the username.

```
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
```


### Challenges

As my first fullstack project it was at first challenging to work through the relationship between the frontend and the backend but I was very happy with the end project. I would like to revisit this at some point and utilise Bootstrap more for styling and add some more functionality.

### Wins

I was happy with my solution to storing the object ID at the creation of a review and then doing a search for the name at the time of that information needing to be displayed. I could not have stored the name as static information in the event of a name change and also due to the nature of Google names not being unique.

If I was using a login system where usernames were an option I would have preferred to store this to avoid doing an extra search (aside from fetching the list of reviews) to avoid a heavier load.

### Key Learnings/Takeaways


I really enjoyed using MongoDB (as you will see in my next project) and feel much more comfortable with it as a result of this project.


### Bugs

The navbar does not currently automatically change when the user logs in after logging out.

### Future Improvements

I would like to add an AWS bin to this project to be able to store images straight into the website. Currently the images used for each review are unchangeable. 




