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
           <img src="${tweet.author.avatar} " class="user-img" alt="" />
          <div class="body">
            <a class="user">
              <div class="info">
                <h6>${tweet.author.name}</h6>
                <p>@${tweet.author.screen_name}</p>
                <p>${tweet.created_at} </p>
              </div>
              <i class="bi bi-three-dots"></i>
            </a>
            <a href='?status/${tweet.tweet_id}' class="content">
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
