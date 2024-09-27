// *  Localstorage kayıt yapacak fonksiyon
export const setLocal = (key, data) => {
  // Verileri stringe çevir
  const strData = JSON.stringify(data);
  // Localstorage kayıt yap
  localStorage.setItem(key, strData);
};

// * Localstorage dan verileri silen fonksiyon

export const removeLocal = (key) => {
  // Localstorage dan belirtilen key e sahip verileri kaldır
  localStorage.removeItem(key);
};

// * Localstorage dan verileri alan fonksiyon

export const getLocal = (key) => {
  // Localstorage dan belirtilen key e sahip verileri al
  const strData = localStorage.getItem(key);
  // Bu verileri Json a çevir
  const data = JSON.parse(strData);
  // Fonksiyon çağırıldığında bu veriyi dönder
  return data;
};
