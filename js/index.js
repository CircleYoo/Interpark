window.onload = function () {
  // 위로 이동하기
  // .gotop 을 js에 저장하자.
  const goTop = document.querySelector(".gotop");
  // goTop 클릭을 처리한다.
  // goTop.addEventListener("click", function () {
  //   // 위로 슬라이드
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // });

  // anime.js
  // 알아보기
  const scrollElement =
    window.document.scrollingElement ||
    window.document.body ||
    window.document.documentElement;
  goTop.addEventListener("click", function () {
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });
  // <!-- Initialize Swiper -->

  // 1번. 백틱을 이용한 html 생성
  // 2번. json 데이터로 뽑아보기
  // .sw-promotion 에 출력할 html 생성
  // for 문을 이용한 데이터 html 생성
  // json 형태: JavaScript Object Notaition 형식의 데이터가 전달됨.
  // prodata.json 을 불러와서 배치한다.

  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      // 현재 전달된 문자들은 josn 이 아니다.
      // req.response 는 데이터 타입이 문자열.
      // 문자열을 json 객체로 변경하는 작업을 해보자.
      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };
  xhttp.open("GET", "prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];

      let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
      swPromotionHtml += html;
    }
    // 위의 백틱 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;

    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        el: ".sw-promotion-pg",
        clickable: true,
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  // Shopping button
  let shoppingBtn = document.querySelectorAll('.shopping .btns a');
  let shopCategories = ['deal', 'best', 'monsoon', 'lowest', 'sodam'];
  shoppingBtn.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      shoppingBtn.forEach(btn => btn.classList.remove('btns-active'))
      this.classList.add('btns-active');

      let category = shopCategories[index];
      newData = shoppingData[category];

      makeShoppingSlide(newData);
    })
  })
  // <!-- Shopping Swiper -->
  let shoppingData;
  fetch('./shoppingdata.json')
    .then(response => response.json())
    .then(result => {
      shoppingData = result;
      makeShoppingSlide(shoppingData.deal);
    })
    .catch(error => console.log(error));
  
  function makeShoppingSlide(data) {
    let swShoppingHtml = ``;
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      let ratio = obj.ratio !== null ? `<span>${obj.ratio}%</span>` : '';
      let temp = `
        <div class="swiper-slide shopping-item">
          <a href="${obj.link}" class="good">
            <img src="images/${obj.pic}" alt="${obj.product}" />
            <div class="good-info">
              <ul class="good-info-list">
                <li>
                  <b>${ratio}${obj.price}원</b>
                </li>
                <li><p>${obj.product}</p></li>
              </ul>
            </div>
          </a>
        </div>
      `;
      swShoppingHtml += temp;
    }

    // 전체보기 버튼
    let swShoppingBtn = `
      <div class="swiper-slide shopping-item shopping-btnMore"> 
        <a href="#" alt="쇼핑 전체보기">
          <i></i>
          전체보기
        </a>
      </div>
    `;

    swShoppingHtml += swShoppingBtn;
    
    const swShoppingWrapper = document.querySelector(".sw-shopping .swiper-wrapper");
    swShoppingWrapper.innerHTML = swShoppingHtml;

    let shoppingSwiper = new Swiper(".sw-shopping", {
      slidesPerView: 5,
      grid: {
        rows: 2,
        column: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".shopping .sw-next",
        prevEl: ".shopping .sw-prev",
      },
      breakpoints: {
        768: {
          spaceBetween: 10,
          slidesPerView: 5,
          slidesPerGroup: 5,
          grid: {
            rows: 2,
          },
        },
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
      // freeMode : true
    });
  }

  // tour button
  let tourBtn = document.querySelectorAll('.tour .btns a');
  let tourCategories = ['soldOut', 'package', 'domestic', 'overseas'];

  tourBtn.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      // ↓ 모든 버튼에서 class 제거
      tourBtn.forEach(btn => btn.classList.remove('btns-active'))
      this.classList.add('btns-active')

      let category = tourCategories[index];
      newData = tourData[category];

      makeTourSlide(newData);
    })
  })

  // tour Swiper
  let tourData;
  /* const tourXhttp = new XMLHttpRequest();
   * tourXhttp.onreadystatechange = function (event) {
   *   const req = event.target;
   *   if (req.readyState === XMLHttpRequest.DONE) {
   *     tourData = JSON.parse(req.response);
   *     makeTourSlide();
   *   }
   * };
   * tourXhttp.open("GET", "tourdata.json");
   * tourXhttp.send();
   */ 
  fetch('./tourdata.json')
    .then(response => response.json())
    .then(result => {
      tourData = result;
      makeTourSlide(tourData.soldOut);
    })
    .catch(error => console.log('toudata 가져오기 실패', error))

  function makeTourSlide(data) {
    let swTourHtml = ``;
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      let category = obj.category !== null ? `<span class="tour-cate">${obj.category}</span>` : '';
      let title = obj.title !== null ? `<span class="tour-title">${obj.title}</span>` : '';
      
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">
              <li ${
                obj.category ? "style='display:block'" : "style='display:none'"
              }>
                ${category}
              </li>
              <li>
                ${title}
              </li>
              <li>
                <span class="tour-place">${obj.place}</span>
              </li>
              <li>
                <span class="tour-price"><b>${obj.price}</b>원~</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
      `;
      swTourHtml += temp;
    }

    const swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
    swTourWrapper.innerHTML = swTourHtml;

    let tourSwiper = new Swiper(".sw-tour", {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".tour .sw-next",
        prevEl: ".tour .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 2,
          // 화면당 2개씩 슬라이드 이동
          slidesPerGroup: 2,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 3,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

// ticket button
let ticketBtn = document.querySelectorAll('.ticket .btns a');
// json데이터 - 배열 카테고리로 관리
let ticketCategories = ['musical', 'play', 'classic', 'sports', 'leisure', 'exhibition'];

ticketBtn.forEach((item, index) => {
  item.addEventListener('click', function(e) {
    e.preventDefault();

    // 클래스 변경
    ticketBtn.forEach(btn => btn.classList.remove('btns-active'))
    this.classList.add('btns-active');

    // 카테고리 변경
    let category = ticketCategories[index];
    newData = ticketData[category]

    makeTicketSlide(newData);
  })
})

// 티켓 json 연동
let ticketData;
fetch('./ticketdata.json')
  .then(response => response.json())
  .then(result => {
    ticketData = result;
    makeTicketSlide(ticketData.musical);
  })
  
function makeTicketSlide(data) {
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    let sale = '';
    let seat = '';

    if (obj.sale !== null) {
      sale = `<li><span class="ticket-sale">${obj.sale}</span></li>`;
    } else if (obj.seat !== null) {
      seat = `<li><span class="ticket-seat">${obj.seat}</span></li>`;
    }

    let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="ticket-link">
          <div class="ticket-img">
            <img src="images/${obj.poster}" alt="${obj.title}" />
            <span class="ticket-rank">${obj.rank}</span>
          </div>
          <div class="ticket-info">
            <ul class="ticket-info-list">
              <li>
                <span class="ticket-title">${obj.title}</span>
              </li>
              <li>
                <span class="ticket-hall">${obj.hall}</span>
              </li>
              <li>
                <span class="ticket-date">${obj.date}</span>
              </li>
              ${sale}
              ${seat}
            </ul>
          </div>
        </a>
      </div>
    `;
    html += temp;
  }
    const swTicketWrapper = document.querySelector(
      ".sw-ticket .swiper-wrapper"
    );
    swTicketWrapper.innerHTML = html;

    let ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  let livedata = null;
  fetch('./livedata.json')
    .then(response => response.json())
    .then(result => {
      livedata = result;
      makeLiveSlide();
    })
    .catch(error => {
      console.log('liveData Error', error);
    });
    
  
  function makeLiveSlide() {
    let html = ``;
    for (let i = 0; i < livedata.length; i++) {
      let obj = livedata[i];
      let thumbPic = obj.thumbPic !== null ? `<img src="images/${obj.thumbPic}" alt="" />` : '';
      let desc = obj.desc !== null ? `<p class="live-info-desc-title">${obj.desc}</p>` : '';
      let sale = obj.sale !== null ? `<em>${obj.sale}%</em>` : '';
      let price = obj.price !== null ? `<b>${obj.price}</b>원` : '';

      let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="live-link">
            <div class="live-img">
              <img src="images/${obj.pic}" alt="${obj.alt}" />
            </div>
            <div class="live-info">
              <div class="live-info-top">
                <span class="live-info-cate">${obj.cate}</span>
                <p class="live-info-title">${obj.title}</p>
              </div>
              <div class="live-info-main">
                <p class="live-info-date">${obj.date}</p>
                <p class="live-info-time">${obj.time}</p>
              </div>
              <div class="live-info-bottom clearfix">
                <div class="live-info-thumb">
                  ${thumbPic}
                </div>
                <div class="live-info-desc">
                  ${desc}
                  <p class="live-info-desc-price">
                    ${sale} ${price}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      `
      html += temp;
    }

    const swLiveWrapper = document.querySelector('.sw-live .swiper-wrapper')
    swLiveWrapper.innerHTML = html;

    let liveSwiper = new Swiper(".sw-live", {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  // 오늘의 도서 button
  let bookBtn = document.querySelectorAll('.books .btns a');
  let bookCategories = ['MD_book', 'best_seller', 'recommend', 'sale'];
  bookBtn.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      bookBtn.forEach(btn => btn.classList.remove('btns-active'));
      this.classList.add('btns-active');

      let category = bookCategories[index];
      newData = bookData[category]
      bookSilde(newData)
    })
  })
  // 오늘의 도서 json 연동
  let bookData = null;
  fetch('./bookData.json')
    .then(response => response.json())
    .then(result => {
      bookData = result;
      bookSilde(bookData.MD_book);
    })
  function bookSilde(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      let rank = obj.rank !== null ? `<i class="books-num">${obj.rank}</i>` : '';
      let desc = obj.desc !== null ? `<p class="books-info-desc">${obj.desc}</p>` : '';
      let sale = obj.sale !== null ? `<span><em>${obj.sale}</em>%</span>` : '';
      let price = obj.price !== null ? `<em>${obj.price}</em>원` : '';
      let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="books-link">
            <div class="books-img">
              <img src="images/${obj.pic}" alt="${obj.alt}" />
              ${rank}
            </div>
            <div class="books-info">
              <p class="books-info-title">${obj.title}</p>
              ${desc}
              <p class="books-info-price">
                ${sale}
                ${price}
              </p>
            </div>
          </a>
        </div>
      `;
      html += temp;
    }
    const swBookWrapper = document.querySelector(
      ".sw-books .swiper-wrapper"
    );
    swBookWrapper.innerHTML = html;
    
    let booksSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  let eventsSwiper = new Swiper(".sw-events", {
    slidesPerView: 3,
    spaceBetween: 27,
    navigation: {
      nextEl: ".event .sw-next",
      prevEl: ".event .sw-prev",
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
    },
  });
};
