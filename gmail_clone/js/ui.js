// Ekrana mail oluşturma modalını açan fonksiyon
export function showModal(modal, willOpen) {
  modal.style.display = willOpen ? "block" : "none";
}

// Ekrana Mail render eden fonksiyon
// Bu fonksiyon 2 parametre alır.Birincisi hangi kısımda render edilecek ==> outlet; ikincisi hangi veriyi render eeddecek ==> data
export function renderMails(outlet, data) {
  if (!data) return;

  outlet.innerHTML = data
    .map(
      (mail) => `  
           <div class="mail" id="mail" data-id=${mail.id} >
            <div class="left">
              <input type="checkbox" />
              <i class="bi bi-star${mail.stared ? "-fill" : ""}"></i>
              <span>${mail.receiver} </span>
            </div>
            <div class="right">
              <p class="message-title">${trimString(mail.title, 20)} </p>
              <p class="message-description">${trimString(
                mail.message,
                40
              )} </p>
              <p class="message-date">${mail.date} </p>
              <div class="delete">
                <i class="bi bi-trash"></i>
              </div>
            </div>
          </div>
        `
    )
    .join(" ");
}

// Metin ifadeleri belirli karakterden sonra kesecek fonksiyon

function trimString(str, max) {
  // Eğer max karakter limitini aşmıyorsa veriyi döndür
  if (str.length < max) return str;
  // Max.karakterden büüykse bunu max karaktere bağlı olarak kes sonrasında ... ekle
  return str.slice(0, max) + "...";
}
