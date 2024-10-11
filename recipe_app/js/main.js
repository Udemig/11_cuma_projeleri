import { elements } from "./helper.js";
import { Search } from "./api.js";
import { clearLoader, renderLoader, renderResults } from "./ui.js";

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
