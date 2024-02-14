const apiKey = '60e5364e057747dda0a7a31ed61d1263';

const postContainer = document.getElementById("postContainer");

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
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
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        postCard.appendChild(img);
        postCard.appendChild(title);
        postCard.appendChild(description);

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