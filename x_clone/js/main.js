// Diğer sayfalardan gelen importlar
import { API } from "./api.js";
import { getLocal, removeLocal } from "./helper.js";
import { mainEle, renderLoader, renderTimeline } from "./ui.js";

const user = getLocal("user");
// console.log(name);
renderLoader(mainEle.tweetsArea);
const api = new API();
document.addEventListener("DOMContentLoaded", async () => {
  const data = await api.fetchData("/timeline.php", "screenname", user.profile);
  //   console.log(data);

  renderTimeline(user, data.timeline, mainEle.tweetsArea);
});

// *  Çıkış Yap Fonksiyonu
mainEle.logoutBtn.addEventListener("click", () => {
  // Localstorage dan verileri sil
  removeLocal("user");
  // Giriş sayfasına yönlendir
  window.location = "/auth.html";
});
