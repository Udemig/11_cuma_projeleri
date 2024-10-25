import { v4 } from "https://jspm.dev/uuid";
import {
  controlBtn,
  elements,
  getFromLocalStorage,
  setLocalStorage,
} from "./helper.js";
import { Search } from "./api.js";
import {
  clearLoader,
  renderLoader,
  renderResults,
  renderBasketItems,
} from "./ui.js";
import { Recipe } from "./recipe.js";
const recipe = new Recipe();

// console.log(elements);

// ! Fonksiyonlar

const handleSubmit = async (e) => {
  // Formun gönderilmesinde sayfa yenilemeyi engelle
  e.preventDefault();
  // Search inputun içeriğine erişme
  const query = elements.searchInput.value;

  //  Search kısımı boş değilse işlem gerçekleştir.
  if (query) {
    // Search classının örneğini
    const search = new Search(query);

    // Ekrana Loader Bas
    renderLoader(elements.resultList);

    try {
      // Apı a  istek at
      await search.getResults();
      // Api dan cevap geldiğinde loaderı kaldır
      clearLoader();
      // Ekrana sonuçları render et
      renderResults(search.result);
    } catch (err) {
      alert(`Aradığınız kriterler uygun tarif bulunamadı`);
    }
  }
};

// ! Olay İzleyicileri
elements.form.addEventListener("submit", handleSubmit);

// ! Sayfa yüklendiğinde ve url değiştiğinde çalışacak fonksiyon
const controlRecipe = async (eventName) => {
  // console.log(`controlRecipe çalıştı`);

  const id = location.hash.replace("#", "");
  // İd kontrolü yapar
  if (id) {
    renderLoader(elements.recipeArea);
    // Eğer id varsa api a istek at
    try {
      await recipe.getRecipe(id);

      // Loader'ı ekrandan kaldır.
      clearLoader();

      // Tarif bilgilerini ekrana render et
      recipe.renderRecipe(recipe.info);

      // tarif kısımında yer alan arayüz scroll'unu düzenle
      elements.recipeArea.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      // Hata varsa kullanıcıya uyarı ver
      alert(`Veriler alınırken bir hata oluştu.`);
      clearLoader();
    }
  }
};

// ! Sayfanın yüklenmesi ve url değişimini izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

// !!! Sepet İşlemleri:

let basket = getFromLocalStorage("basket") || [];

// Tarif alanında gerçekleşen tıklamaları izle

const handleClick = (e) => {
  // Eğer 'add-to-basket' id sine sahip bir elemana tıklandıysa çalış
  if (e.target.id === "add-to-basket") {
    // Add to basket idsine sahip elemana tıklanınca bunun kadeş elemanına eriş
    recipe.ingredients.forEach((title) => {
      // Yeni bir obje oluştur
      const newItem = {
        id: v4(),
        title,
      };
      // NewItem'ı  sepete ekle
      basket.push(newItem);
    });
    // Sepeti localStorage a ekle
    setLocalStorage("basket", basket);

    // ekrana sepetteki elemanları bas

    renderBasketItems(basket);

    // clearBtn i kontrol et
    controlBtn(basket);
  }

  // Like butonuna tıklandıysa
  if (e.target.id == "like-btn") {
    recipe.controlLike();
  }
};

const deleteItem = (e) => {
  if (e.target.id == "delete-item") {
    // kapsayıcısına eriş
    const parent = e.target.parentElement;

    // seçilen ürünü basket dizisinden kaldırmak için id'ye eriş ve elemanı diziden kaldır
    basket = basket.filter((i) => i.id != parent.dataset.id);

    // localStorage'ı güncelle
    setLocalStorage("basket", basket);

    // Elemanı sepetten kaldır
    parent.remove();
    // clearBtn i kontrol et
    controlBtn(basket);
  }
};

const handleClear = () => {
  const res = confirm("Bütün sepet silinecek!! Eminmisiniz ??");
  if (res) {
    //  localStorage'daki basket'ı null yap
    setLocalStorage("basket", null);
    // basket dizisini boşalt
    basket = [];
    // sepet alanının Html'ini boşalt
    elements.basketList.innerHTML = "";

    // clearBtn i kontrol et
    controlBtn(basket);
  }
};

// Sepetteki ürün ekle butonuna tıklayınca fonksiyon tetikleme
elements.recipeArea.addEventListener("click", handleClick);

// Sepetten eleman kaldırma
elements.basketList.addEventListener("click", deleteItem);

// Sepeti Temizleme

elements.clearBtn.addEventListener("click", handleClear);
