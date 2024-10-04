export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passwordInp: document.querySelector("#password"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

export const mainEle = {
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsArea: document.querySelector(".tweets-area"),
  main: document.querySelector("main"),
  searchForm: document.querySelector(".news form"),
};

// Ekrana Loader render edecek fonksiyon

export const renderLoader = (outlet) => {
  outlet.innerHTML = `
   <div class='d-flex justify-content-center mt-5'>
     <div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    </div>
  `;
};

// Tweet Detay sayfasındaki Loader

export const renderEmptyLoader = () => {
  mainEle.main.innerHTML = `
  
  <div class='top'>
  <i class="bi bi-arrow-left"></i>

  <h3>Gönderi</h3>

  </div>

    <div class='d-flex justify-content-center mt-5'>
     <div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    </div>

  
  `;
};

// Media içeriğini render eden fonksiyon

const getMedia = (media) => {
  // Media içeriği foto ise
  if (media.photo) {
    return `<img src=${media.photo[0].media_url_https} alt="" />`;
  }
  // Media içeriği video ise
  if (media.video) {
    // mp4 leri al
    const filter = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );

    return ` <video src=${filter[0].url} controls ></video>`;
  }

  return "";
};

// Tweetleri render edecek fonksiyon
export const renderTimeline = (user, tweets, outlet) => {
  console.log(tweets);

  let timelineHTML = tweets
    .map(
      (tweet, i) => `
      <div class="tweet">
           <img src="${user.avatar} " class="user-img" alt="" />
          <div class="body">
            <a class="user" href='?user#${
              user ? user.profile : tweet.screen_name
            } '>
              <div class="info">
                <h6>${tweet.author?.name}</h6>
                <p>@${tweet.author?.screen_name}</p>
                <p>${moment(tweet.created_at).fromNow()} </p>
              </div>
              <i class="bi bi-three-dots"></i>
            </a>
            <a href='?status/${user ? user.profile : tweet.screen_name}#${
        tweet.tweet_id
      } ' class="content">
              <p>${tweet.text} </p>
             ${getMedia(tweet.media)}
            </a>
            <div class="buttons">
              <button><i class="bi bi-chat"></i> <span>${
                tweet.replies
              } </span></button>
              <button><i class="bi bi-recycle"></i> <span>${
                tweet.retweets
              } </span></button>
              <button><i class="bi bi-suit-heart"></i> <span>${
                tweet.favorites
              } </span></button>
              <button><i class="bi bi-bookmark"></i> <span>${
                tweet.bookmarks
              } </span></button>
            </div>
          </div>
        </div>
  
  `
    )

    .join("");

  outlet.innerHTML = timelineHTML;
};

// Tweet Detaylarını Render Edecek Fonksiyon

export const renderInfo = (info, userName) => {
  const html = `
  
  <div class='info-area'>

  <div class='top'>
  <i class="bi bi-arrow-left"></i>

  <h3>Gönderi</h3>

  </div>

  <div class='tweet-info'>
  
  <div class='user'>
  <div class='info'>
   <img src='../images/default.png' />
   <h6>${info.author.name} </h6>
   <p>@${info.author.screen_name} </p>
  </div>

  <button>Abone Ol</button>
  </div>

  <div class='content'>
    <p class='content-text'>${info.text} </p>
  </div>


  <div class='data'>
  <p>
  <span class='count'>${info.retweets}  </span>
  <span>Yeniden Gönderi</span>

  </p>

   <p>
  <span class='count'>${info.quotes} </span>
  <span>Alıntılar</span>

  </p>

   <p>
  <span class='count'>${info.likes}</span>
  <span>Beğeni</span>

  </p>

   <p>
  <span class='count'>${info.bookmarks}</span>
  <span>Yer İşareti</span>

  </p>
  
  </div>

    <div class="buttons">
              <button><i class="bi bi-chat"></i> <span>44 </span></button>
              <button><i class="bi bi-recycle"></i> <span>44 </span></button>
              <button><i class="bi bi-suit-heart"></i> <span>44 </span></button>
              <button><i class="bi bi-bookmark"></i> <span>44 </span></button>
            </div>
  
  
  </div>
  
  </div>
  `;

  mainEle.main.innerHTML = html;
};

//  Kullanıcı Detay  Sayfasını Render Edecek Fonksiyon

export const renderUserPage = (user) => {
  console.log(user);

  mainEle.main.innerHTML = `
  <div class='user-page'>

   <div class='top'>
    <i class="bi bi-arrow-left"></i>

    <h3>${user.name} </h3>
   </div>
   
  
  
   <div class='banner'>
   <img src='${user.header_image} '/>
   <img src='${user.avatar} ' class='user-pp'/>
   </div>

   <div class='buttons'>

   <div class='icon'>
   <i class="bi bi-three-dots"></i>
   </div>

   <div class='icon'>
  <i class="bi bi-envelope"></i>
   </div>

   <button>Takip Et</button>
   </div>

   <div class='user-page-info'>
  
   <h4>${user.name}</h4>

    <p>@${user.profile}</p>

   <p>${user.desc} </p>

   <div>
     <p>
     <span class='user-count'>${user.friends}</span>
     <span>Takip Edilen</span>
     </p>

     <p>
     <span class='user-count'>${formatNumber(user.sub_count)}</span>
     <span>Takipçi</span>
     </p>
   </div>


  </div>

  <div class='user-tweets'>
  </div>
  
  `;
};

const formatNumber = (number) => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(2) + "M";
  }
};
