export class Search {
  // Kurucu  Metot
  constructor(query) {
    this.query = query;
    this.result = [];
  }

  // Api'a istek atacak fonksiyon
  async getResults() {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
    );

    const data = await res.json();
    this.result = data.recipes;
    // console.log(data.recipes);
  }
}
