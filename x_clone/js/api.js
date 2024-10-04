// Base Url
const baseURL = `https://twitter-api45.p.rapidapi.com`;

// https://twitter-api45.p.rapidapi.com/timeline.php?screenname=elonmusk

// https://twitter-api45.p.rapidapi.com/followers.php?
// Options
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "68585d24e7msha49d2d4328521cfp16761cjsn7e345f84e479",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

// Apı istekleri için bir class

export class API {
  // Kurucu Metot
  constructor() {}

  // Kullanıcı verilerini al
  async getUser(username) {
    try {
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  //  Diğer Apı istekleri
  // Fonksiyonu ve bu fonksiyonun alacağı parametreleri tanıttık
  async fetchData(endpoint, paramName, paramValue) {
    try {
      // Apı isteği
      const res = await fetch(
        `${baseURL}${endpoint}?${paramName}=${paramValue}`,
        options
      );
      // Gelen veriyi json a çevir
      const data = await res.json();
      // Bu fonksiyon çağırıldığında veriyi döndür
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
