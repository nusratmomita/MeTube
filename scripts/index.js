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
         <button id="btn-${cat.category_id}" onclick=loadCategoryVideo(${cat.category_id}) class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
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
    .then(data => displayVideos(data.videos))
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
        // console.log(clickedButton)
        clickedButton.classList.add("active");
        displayVideos(data.category);
    })
}

const displayVideos = (videos) => {
    console.log(videos)
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
        */
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="mt-12 card bg-base-100 shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="thumbnail" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(videoDiv)
    })

}
