import { API } from "./api.js";
import { setLocal } from "./helper.js";
import { authEle } from "./ui.js";
// console.log(authEle);

// ! API clasının örenği alındı
const api = new API();
// Regex: Regex belirli şartları kontrol etmek için sorgu yapılarını içeren koddur.
// * Enaz 6 karakter,1 küçük harf,1 büyük harf,birde sayı
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

// ! Form kontrolü sonrasında hataları render eden fonk.

// ! Auth sayfasında yer alan form gönderildiğinde çalışacak fonk.

const renderWarns = (nameWarning, passWarning) => {
  // İsim hatası varsa
  if (nameWarning) {
    authEle.nameArea.innerHTML = `
    <p class="warning">${nameWarning} </p> 
    `;
  } else {
    authEle.nameArea.innerHTML = "";
  }
  // Şifre Hatası varsa
  if (passWarning) {
    authEle.passArea.innerHTML = `
          <p class="warning">${passWarning} </p>
`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

authEle.loginForm.addEventListener("submit", async (e) => {
  // Form gönderildiğinde sayfa yenilenmesi iptal edildi
  e.preventDefault();
  // Formun içerisindeki verilere erişme

  const name = authEle.nameInp.value;
  const pass = authEle.passwordInp.value;

  let nameWarning = null;
  let passWarning = null;
  // Formdaki isim kısımını kontrol et
  if (!name) {
    nameWarning = "İsim kısımı boş bırakılamaz ";
  } else if (name.length < 5) {
    nameWarning = "İsim 5 karakterden kısa olamaz ";
  } else {
    nameWarning = null;
  }
  // Formdaki şifre kısımını kontrol et

  if (!pass) {
    passWarning = "Şifre giriniz !! ";
  } else if (pass.length < 6) {
    passWarning = "Şifre 6 haneden kısa olamaz";
  } else if (!regex.test(pass)) {
    passWarning = "Zayıf Şifre";
  } else {
    passWarning = null;
  }

  renderWarns(nameWarning, passWarning);

  if (!nameWarning && !passWarning) {
    // Apı dan kullanıcı adı ile bu kullanıcının verilerini al
    const userData = await api.getUser(name);
    // Kullanıcı verilerini localstorage a set et
    setLocal("user", userData);
    // Beni ana sayfaya yönlendir
    // Eğer tüm şartlar sağlanıyorsa beni ana sayfaya yönlendir.
    window.location = "/";
  }
});
