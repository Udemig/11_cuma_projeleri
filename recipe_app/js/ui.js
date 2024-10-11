import { elements } from "./helper.js";

// Ekrana Loader render eden fonksiyon
export const renderLoader = (parent) => {
  const loader = `
  <div class='loader'>
  <img src='/images/food-load.gif'/>
  </div>
  `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

// Loaderı ekrandan kaldıran fonksiyon

export const clearLoader = () => {
  // Ekranda loader varsa bunu loader değişkenine ata
  const loader = document.querySelector(".loader");
  // Loader varsa bunu ekrandan kaldır.
  if (loader) loader.remove();
};

// Apı dan gelen veriye göre ekrana arama sonuçlarını render eden fonksiyon

export const renderResults = (recipes) => {
  elements.resultList.innerHTML = "";
  // Herbir sonuç için ekrana kart bas
  recipes.slice(0, 10).forEach((recipe) => {
    // Kart Html i
    const markup = `
              <a href='#${recipe.recipe_id}' class="result-link">
             <img
             src="${recipe.image_url}"
             alt=""
             />
             <div class="data">
                <h4>${recipe.title}</h4>
                <p>${recipe.publisher}</p>
              </div>
             </a>
              
              `;
    // Oluştulan Html i uygun yere ilet
    elements.resultList.insertAdjacentHTML("beforeend", markup);
  });
};
