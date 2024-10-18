export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
};

// localStorage a verileri kaydet
export const setLocalStorage = (key, data) => {
  // Verileri string e çevir
  const strData = JSON.stringify(data);

  // String e çevirilen elemanı localstorage a kayıt et
  localStorage.setItem(key, strData);
};

// localStorage dan verileri al

export const getFromLocalStorage = (key) => {
  // Belirtilen key e sahip elemanları localStorage dan alma
  const strData = localStorage.getItem(key);

  // Localstrorage dan alınan veriyi json çevirme
  const data = JSON.parse(strData);

  return data;
};
