import { elements } from "./helper.js";

export class Recipe {
  constructor() {
    // Tarif bilgileri
    this.info = {};
    // Malzemeler
    this.ingredients = [];
  }

  // Tarif bilgilerini alma
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // Verileri işle
    const data = await res.json();

    this.info = data.recipe;

    this.ingredients = data.recipe.ingredients;
  }

  // Her tarif için bir liste elemanı oluştur.

  createIngredient() {
    const html = this.ingredients
      .map(
        (ingredient) =>
          `  
        
          <li>
               <i class="bi bi-check-circle"></i>
               <span>${ingredient} </span>
          </li>
                
      `
      )

      .join("");

    // join buradaki dizilerin ',' ile ayrılan yapısını '' çekerek elemanları dönülebilir hale getirdi.

    return html;
  }

  // Tarif bilgilerini ekrana render etme

  renderRecipe(recipe) {
    console.log(recipe);

    const markup = `<figure>
            <img
              src=${recipe.image_url}
              alt=""
            />
            <h1>${recipe.title} </h1>
          
            <div class="like-area">
              <i class="bi bi-heart"></i>
            </div>
          </figure>
       
          <div class="ingredients">
            <ul>
              ${this.createIngredient()}
            </ul>
            
            <button id="add-to-basket">
              <i class="bi bi-cart2"></i>
              <span>Alışveriş Sepetine Ekle</span>
            </button>
          </div>
      
          <div class="directions">
            <h2>Nasıl Pişirilir?</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher}  </span>tarafından
              hazırlanmış ve test edilmiştir. Diğer detaylara onların websitesi
              üzerinden erişebilirsiniz.
            </p>
            <a href="${recipe.publisher_url} " target="_blank">Yönerge</a>
          </div>`;
    elements.recipeArea.innerHTML = markup;
  }
}
