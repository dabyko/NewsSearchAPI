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

function displayPosts(articles){
    postContainer.innerHTML = "";
    articles.forEach(article => {
        
    });
}

(async ()=>{
    try {
      const articles = await fetchRandomNews();
      console.log("Articles: ", articles);
      displayPosts(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})