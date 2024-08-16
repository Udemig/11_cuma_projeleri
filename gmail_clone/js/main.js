// console.log("Merhaba Dünya");

import { showModal } from "./ui.js";

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

// Hamburger menuye tıklanınca nav kısımını gizle
hamburgerMenu.addEventListener("click", hideMenu);

// Hamburger menu'ye tıklanınca çalışacak fonksiyon
function hideMenu() {
  // toggle yapısı bir eleman belirtilen class ekli ise çıkarır; ekli değilse bunu ekler.
  navigation.classList.toggle("hide");
}

// Oluştur Butonuna tıklanınca modalı açan fonksiyon

createMailBtn.addEventListener("click", () => showModal(modal, true));
closeMailBtn.addEventListener("click", () => showModal(modal, false));

// Ekran boyutuna bağlı olarak nav kısımını düzenleme

window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;
  if (width < 1100) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});
