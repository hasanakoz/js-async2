//*=================================================
//*              ASYNC-AWAIT
//*=================================================
//? Async-Await ECMAScript 2017 ile Javascript diline eklenmistir.
//? Aslinda Promise yapisinin syntax olarak basitlestirilmis halidir.
//? Bu baglamda sentetik seker benzetmesi yapilabilir.

//* Bir fonskiyonu asenkron hale getirmek icin fonksiyon keyword'nun onune
//* async keyword'u eklenir.

//* Bir async fonksiyon icerisinde await keyword'u ile yapilan istegin cevabinin
//* beklenmesi saglanir.

//* Aslinda dizilis olarak senkron mantiga benzeyen kod yazarak Asenkron
//* kod yazmayı mumkun kilar.

//* Await, promise-temelli herhangi bir fonksiyonun onune getirilerek getirildigi
//* satirdaki kodun durudurulmasini saglar. Yapilan istek yerine getirilip sonuc
//* degerlerinin dondurulmesine ile kodun calismasi devam eder.
let isError = false;

const getNews = async function () {
  const API_KEY = "408013e97a3b418e8eab4c8725040a81";
  const url =
    "https://newsapi.org/v2/top-headlines?country=tr&apiKey=" + API_KEY;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      isError = true;
      //   throw new Error(`something went wrong: ${res.status}`);
    }
    const data = await res.json();
    renderNews(data.articles);
    // console.log(data.articles);
  } catch (error) {
    console.log(error);
  }
};

const renderNews = (news) => {
  const newList = document.getElementById("news-list");
  if (isError) {
    newList.innerHTML += `
    <h2>News cannot be fetched</h2>
    <img src="./img/404.png">`;
  }

  news.forEach((item) => {
    const { title, description, urlToImage, url } = item;
    newList.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${urlToImage}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <a href="${url}" class="btn btn-danger">Go somewhere</a>
  </div>
</div>`;
  });
};

window.addEventListener("load", getNews);
// getNews();
