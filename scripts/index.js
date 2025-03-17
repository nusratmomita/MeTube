// loading categories
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // returning json format of above promise(the fetch() returns a promise)
    .then(res => res.json())
    // .then(data => console.log(data.categories))
    .then(data => displayCategories(data.categories))
}

function displayCategories(categories){
    // console.log(categories)

    // showing the fetched data in the UI
    // showing music , comedy and drawing buttons dynamically
    const categoryBtn = document.getElementById('category-btn');

    for(const cat of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
         <button id="btn-${cat.category_id}" onclick=loadCategoryVideo(${cat.category_id}) class="btn btn-md ">${cat.category}</button>
        `
        categoryBtn.appendChild(categoryDiv)
    }
}
loadCategories()


// loading videos
function loadVideos(){
    // console.log("loading vidoes")
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        document.getElementById('btn-all').classList.add('active')
        displayVideos(data.videos)
    })
}

// removing active class for better undestanding
function removeActiveClass(){
    const btnActive = document.getElementsByClassName("active");

    for(const btn of btnActive){
        btn.classList.remove("active");
    }

    // console.log(btnActive)
}

// category wise video displaying
const loadCategoryVideo = (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickedButton = document.getElementById(`btn-${id}`);
        removeActiveClass();
        // console.log(clickedButton)
        clickedButton.classList.add("active");
        displayVideos(data.category);
    })
}

// showing video details when a button is clicked
const loadVideoDetails = (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}

// displaying video details
const displayVideoDetails = (video) => {
    // console.log(video)
    document.getElementById('video-details').showModal();
    const videoContainer = document.getElementById("details-container");

    videoContainer.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="thumbnail" />
            </figure>
            <div class="card-body">
                <h2 class="font-bold text-2xl">${video.title}</h2>
                <p class="text-xl ">${video.description}"</p>
                </div>
            </div>
        </div>
    
    
    `
}
const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = "";
    
    if(videos.length === 0 ){
        videoContainer.innerHTML = ` 
            <div class="py-28 col-span-4 flex flex-col justify-center items-center text-center">
                    <img class="w-[120px]" src="assets/Icon.png" alt="Icon">
                    <h1 class="text-2xl text-gray-600 font-semibold">Oops!! Sorry, There is no content here</h1>
            </div>`
        return;
    }
    videos.forEach((video) => {
        // console.log(video)

        /*
        !! sort this later
        !! review the code again for better understanding
        */
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
            <div class="mt-24 card bg-base-100">
                <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${
                    video.thumbnail
                }" alt="Shoes" />
                <span
                    class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
                    >3hrs 56 min ago</span
                >
                </figure>

            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                    <div
                        class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                    >
                        <img
                        src="${video.authors[0].profile_picture}"
                        />
                    </div>
                    </div>
                </div>

                <div class="intro">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                        ${video.authors[0].profile_name}
                        <img
                        class="w-5 h-5"
                        src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                        alt=""
                    />
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>

            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-outline btn-error">View Details</button>
        </div>
        `
        videoContainer.appendChild(videoDiv)
    })

}
