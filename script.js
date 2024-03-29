const apiKey = '60e5364e057747dda0a7a31ed61d1263';

const postContainer = document.getElementById("postContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Response data: ", data);
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchBtn.addEventListener('click', async ()=>{
    const query = searchInput.value.trim()
    if(query!==""){
        try {
           const articles = await fetchNewsQuery(query);
           displayArticles(articles);
        } catch (error) {
            error.log("Error fetching news by query", error);
        }
    }
}); 

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Response data: ", data);
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayArticles(articles){
    postContainer.innerHTML = "";
    articles.forEach(article => {
        const postCard = document.createElement("div");
        postCard.classList.add("postCard");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+ "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescr = article.description.length > 115 ? article.description.slice(0,150)+ "..." : article.description;
        description.textContent = truncatedDescr;

        postCard.appendChild(img);
        postCard.appendChild(title);
        postCard.appendChild(description);
        postCard.addEventListener('click', ()=>{
            window.open(article.url,"_blank");
        }); 
        postContainer.appendChild(postCard);
    });
}

(async () => {
    try {
      const articles = await fetchRandomNews();
      console.log("Articles: ", articles);
      displayArticles(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();