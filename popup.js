// "http://api.mediastack.com/v1/news?access_key=67ce12baef71abeff9f74cf9d81bd4be&limit=20&languages=en"
const sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    var x = new XMLHttpRequest();
    x.open(method, url);

    x.responseType = "json";

    x.onload = function () {
      resolve(x.response);
    };
    x.send();
  });

  return promise;
};

const handleLogin = () => {
  const url = document.getElementById("url");
  url.style.display = "none";
  const ticker = document.getElementById("ticker");
  ticker.style.display = "initial";
  const scroll = document.getElementById("scroll");
  sendHttpRequest(
    "GET",
    "http://api.mediastack.com/v1/news?access_key=67ce12baef71abeff9f74cf9d81bd4be&limit=20&languages=en&sources=cnn"
  ).then((data) => {
    console.log(data);
    for (i = 0; i < data.data.length; i++) {
      const article = document.createElement("article");

      const story = document.createElement("div");

      story.id = "featured-story";

      story.innerHTML = data.data[i].published_at;

      const headline = document.createElement("a");

      headline.innerHTML = data.data[i].title;
      headline.href = data.data[i].url;
      headline.setAttribute("target", "_blank");

      headline.id = "featured-headline";

      const preview = document.createElement("div");

      preview.id = "featured-preview";
      preview.innerHTML = data.data[i].description;

      if (data.data[i].image !== null) {
        const image = document.createElement("img");
        image.src = data.data[i].image;
        image.id = "featured-image";
        image.width = "70";
        image.height = "70";
        article.appendChild(image);
        const box = document.createElement("div");
        box.appendChild(story);
        box.appendChild(headline);
        box.appendChild(preview);
        article.appendChild(box);
        article.style.display = "flex";
      } else {
        article.appendChild(story);
        article.appendChild(headline);
        article.appendChild(preview);
      }

      scroll.appendChild(article);
    }
  });
};

// Checks if User already logged in
const handleCreate = () => {
  chrome.storage.sync.get("URL", function (user) {
    if (user.URL !== "") {
      handleLogin();
    } else {
      const button = document.getElementById("urlButton");
      button.addEventListener("click", () => {
        const input = document.getElementById("urlInput");
        const URL = input.value;
        chrome.storage.sync.set({ URL: URL });
        handleLogin();
        console.log(URL);
      });
    }
  });
};

// Small Delay For Loading
setTimeout(() => {
  handleCreate();
}, 100);
