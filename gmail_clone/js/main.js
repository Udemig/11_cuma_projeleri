// console.log("Merhaba Dünya");

import { categories, months } from "./constants.js";
import { renderCategories, renderMails, showModal } from "./ui.js";
// ! HTML'den Elemanların Çekilmesi
const body = document.querySelector("body");
const btn = document.getElementById("toggle");
const createMailBtn = document.querySelector(".create");
const closeMailBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-wrapper");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const form = document.querySelector("#create-mail-form");
const mailsArea = document.querySelector(".mails-area");
const searchButton = document.querySelector("#search-icon");
const searchInput = document.querySelector("#search-input");
const categoryArea = document.querySelector(".nav-middle");

// localstorage dan verileri al
const strMailData = localStorage.getItem("data");
// Mail Data
const mailData = JSON.parse(strMailData) || [];
// ! Sayfa yüklendiğinde mailleri ekrana bas
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailsArea, mailData);
});
// ! Search iconuna tıklayınca çalışan yapı
searchButton.addEventListener("click", searchMails);

// ! Mail Alanını Güncelle
mailsArea.addEventListener("click", updateMail);

// Hamburger menuye tıklanınca nav kısımını gizle&aç
hamburgerMenu.addEventListener("click", hideMenu);

// ! Hamburger menu'ye tıklanınca çalışacak fonksiyon
function hideMenu() {
  // toggle yapısı bir eleman belirtilen class ekli ise çıkarır; ekli değilse bunu ekler.
  navigation.classList.toggle("hide");
}
// ! Tarih bilgisi oluşturan fonksiyon
function getDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const updateMonth = months[month - 1];

  return day + " " + updateMonth;
}

// ! Oluştur Butonuna tıklanınca modalı açan fonksiyon

createMailBtn.addEventListener("click", () => showModal(modal, true));
closeMailBtn.addEventListener("click", () => showModal(modal, false));
// Form gönderildiğinde sendMail fonksiyonu çalışsın
form.addEventListener("submit", sendMail);

// Ekran boyutuna bağlı olarak nav kısımını düzenleme

window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;
  if (width < 1100) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});
categoryArea.addEventListener("click", watchCategory);
// Toogle yapısı sayesinde dark / light mode eklendi
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  body.classList.toggle("darkMode");
});

function sendMail(e) {
  // Sayfa yenilemeyi iptal et
  e.preventDefault();
  // Form içersindeki inputlara erişme

  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;
  // Mail in boş olma durumunu kontrol et
  if (!receiver || !title || !message) {
    Toastify({
      text: "Formu doldurunuz !",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#FDCC00",
        borderRadius: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    // İnputlardan herhangi biri boşsa uyarı vereceğiz değilse alt kısımın çalışmasını sağlar.
    return;
  }
  // Mail objesi
  const nemMail = {
    id: new Date().getTime(),
    sender: "Yusuf",
    receiver, // receiver:receiver şeklinde yazmadık.Çünkü aynı isime sahip olduklarından js bunu otamatik atıyor.
    title,
    message,
    stared: false,
    date: getDate(),
  };
  // console.log(nemMail);
  // oluşturduğumuz objeyi dizinin başına ekleme
  mailData.unshift(nemMail);
  // localStorage verileri kayıt et.LocalStorage 'string' şeklinde veri kabul eder.
  const strData = JSON.stringify(mailData);
  // Veriyi Localstorage a kayıt et
  localStorage.setItem("data", strData);
  // Ekranı güncelle
  renderMails(mailsArea, mailData);
  // Modalı Kapat
  showModal(modal, false);
  // Modalı Sıfırla
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  Toastify({
    text: "Mail başarıyla gönderildi",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#24BB33",
      borderRadius: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Mailleri Güncelleme
function updateMail(e) {
  if (e.target.classList.contains("bi-trash")) {
    // Silinecek elemanı belirle
    // ! parentElement ==> Belirlenen elemanın bir kapsayıcısına erişmek için kullanılır.
    const mail = e.target.parentElement.parentElement.parentElement;
    // İd değerini bildiğimiz elemenı diziden alma
    const mailId = mail.dataset.id;
    //  İd değerini bildiğimiz elemanı diziden çıkarma
    const filtredData = mailData.filter((i) => i.id != mailId);
    // Diziyi localStorage göndermek için veriyi string e çevir
    const strData = JSON.stringify(filtredData);
    // Localestorage dan veriyi kaldır
    localStorage.removeItem("data");
    // Dizinin güncel halini localStorage a ekle
    localStorage.setItem("data", strData);
    // Maili birde Html den kaldır
    mail.remove();
  }
  if (e.target.classList.contains("bi-star")) {
    // Güncellenecek veriyi belirleme
    //  closest ==> ParentElement 'in defalarca kullanımının kısa yoludur.
    const mail = e.target.closest(".mail");
    // Bu mail elamanına id ekleyelim
    const mailId = mail.dataset.id;
    // id den mail objesini bulma
    const foundItem = mailData.find((i) => i.id == mailId);
    // Bulduğumuz elemanın stared değerini tersine çevirmek
    const updateItem = { ...foundItem, stared: !foundItem.stared };
    // Güncellenecek elemanın sırasını bul
    const index = mailData.findIndex((i) => i.id == mailId);
    // Dizideki elemanı güncelle
    mailData[index] = updateItem;

    localStorage.setItem("data", JSON.stringify(mailData));

    renderMails(mailsArea, mailData);
  }
  if (e.target.classList.contains("bi-star-fill")) {
    const mail = e.target.parentElement.parentElement;
    console.log(mail);
    const mailId = mail.dataset.id;
    const foundItem = mailData.find((i) => i.id == mailId);

    const updatedItem = { ...foundItem, stared: !foundItem.stared };
    const index = mailData.findIndex((i) => i.id == mailId);
    mailData[index] = updatedItem;
    localStorage.setItem("data", JSON.stringify(mailData));
    renderMails(mailsArea, mailData);
  }
}

// ! Kataegoriler kısımınında tıklam olunca çalışacak fonksiyon.
function watchCategory(e) {
  const leftNav = e.target.parentElement;
  const selectedCategory = leftNav.dataset.name;
  renderCategories(categoryArea, categories, selectedCategory);

  if (selectedCategory === "Yıldızlananlar") {
    // console.log(`Yıldız`);
    const filtred = mailData.filter((i) => i.stared === true);
    renderMails(mailsArea, filtred);
    return;
  }
  renderMails(mailsArea, mailData);
}

// ! Arama Fonk.

function searchMails() {
  // İnput tan alınan veriye göre filtreleme yaptık
  const filtredArray = mailData.filter((i) => {
    return i.message.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  // filtrelenen veriyi renderladık
  renderMails(mailsArea, filtredArray);
}
