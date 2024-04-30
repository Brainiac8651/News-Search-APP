const apiKey = '4936e607f8c44430a87d437d3e0d22f6'

const blogContainer = document.getElementById('blog-container')

const searchField = document.getElementById("search-input")

const searchBtn = document.getElementById("search-btn")

async function fetchRandomNews() {
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiURL)
        const data = await response.json()
        return data.articles
    }
    catch(error){
        console.error("Error Fetching random news", error)
        return []
    }
}

searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim()

    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query) 

            displayBlogs(articles)

        } catch(error) {
            console.error("Error Fetching Searched News", error)
        }
    }

})

async function fetchNewsQuery(query) {
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiURL)
        const data = await response.json()
        return data.articles
    }
    catch(error){
        console.error("Error Fetching random news", error)
        return []
    }
}

// function displayBlogs(articles) {
//     blogContainer.innerHTML = ""
//     articles.forEach((article) => {
//         const blogCard = document.createElement("div")
//         blogCard.classList.add("blog-card")
//         const img = document.createElement("img")
//         img.src = article.urlToImage || "https://placehold.co/600x400"
//         img.alt = article.title
//         const title = document.createElement("h2")
//         const truncatedTitle = article.title.length 
//         > 30 ? article.title.slice(0, 30) + "...." : article.title
//         title.textContent = truncatedTitle
//         const description = document.createElement("p") 
//         const truncatedDescription = article.description.length
//         > 120 ? article.description.slice(0, 120) + "...." : article.description
//         description.textContent = truncatedDescription 
        

//         blogCard.appendChild(img)
//         blogCard.appendChild(title)
//         blogCard.appendChild(description)
//         blogCard.addEventListener("click", () => {
//             window.open(article.url, "_blank")
//         })
//         blogContainer.appendChild(blogCard)
//     })
// }

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article, index) => {
        console.log(`Article at index ${index}:`, article)
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}


(async () => {
    try {
       const articles = await fetchRandomNews()
       displayBlogs(articles)
    } catch(error) {
        console.error("Error Fetching random news", error)
    }
})()