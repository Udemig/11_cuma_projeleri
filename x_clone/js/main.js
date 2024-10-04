// Diğer sayfalardan gelen importlar
import { API } from "./api.js";
import { getLocal, removeLocal } from "./helper.js";
import {
  mainEle,
  renderEmptyLoader,
  renderInfo,
  renderLoader,
  renderTimeline,
  renderUserPage,
} from "./ui.js";

const user = getLocal("user");
// console.log(name);

// Apı classının örneğini al
const api = new API();

// Kullanıcının Konumuna Erişme

const controlURL = async () => {
  // Kullanıcı Konumuna Erişme

  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = location.hash.replace("#", "");

  // Kullanıcı yoksa giriş sayfasına yönlendir.
  if (!user) {
    location = "/auth.html";
  }

  // Url anasayfadaysa tweetleri ekran bas
  if (!path) {
    // Loader Bas
    renderLoader(mainEle.tweetsArea);

    // Tweetleri al ve ekrana bas
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );

    renderTimeline(user, data.timeline, mainEle.tweetsArea);
  }

  // tweet detay sayfasındaysa ve id varsa tweet detayını ekrana bas

  if (path == "?status" && id) {
    // Loader ı ekrana bas
    renderEmptyLoader();

    // api a istek at
    const info = await api.fetchData("/tweet.php", "id", id);
    renderInfo(info, userName);
  }

  // kullanıcı detay sayfasındaysa ve id varsa

  if (path == "?user" && id) {
    // Loaderı ekran bas
    renderLoader(mainEle.main);

    // Kullanıcı adını al
    const userInfo = await api.getUser(id);

    // kullanıcı detaylarını render et
    renderUserPage(userInfo);

    // Kullanıcının tweetlerini render edeceği kısıma eriş
    const outlet = document.querySelector(".user-tweets");

    // Loader Bas
    renderLoader(outlet);

    const userTweets = await api.fetchData("/timeline.php", "screenname", id);

    renderTimeline(userInfo, userTweets.timeline, outlet);
  }

  if (path == "?search" && id) {
    // Loader Bas

    renderLoader(mainEle.main);

    // Aratılan değeri api dan al
    const data = await api.fetchData("/search.php", "query", id);

    // Api dan alınan değere göre tweetleri render et
    renderTimeline(user, data.timeline, mainEle.main);
  }
};

// hem sayfa yüklendiğinde hemde hastag kısımı değiştiğinde controlURL çalıştı
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});

// * hashchange url kısımında # ile bir paramtre geçisini kontrol ediyor.Bizim burada birde load olay izleyicisini izlememiz gerekir.Bundan bu iki olayı bir dizi içerisinde tutarak bunları forEach ile döndük.

// *  Çıkış Yap Fonksiyonu
mainEle.logoutBtn.addEventListener("click", () => {
  // Localstorage dan verileri sil
  removeLocal("user");
  // Giriş sayfasına yönlendir
  window.location = "/auth.html";
});

// Formun gönderilmesini izleyen fonksiyon
mainEle.searchForm.addEventListener("submit", (e) => {
  // Sayfa Yenileme İptal
  e.preventDefault();

  // Formun içerisindeki inputun değerine erişme
  const query = e.target[0].value;

  // inputun değerini url e parametre olarak geç
  location = `?search#${query} `;
});
