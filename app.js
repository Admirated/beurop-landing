import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js';

window.addEventListener('DOMContentLoaded', () => {
   //menu
   const burger = document.querySelector('.menu__icon'),
      menu = document.querySelector('.header__navigation'),
      menuHeader = menu.querySelector('.menu__header'),
      menuClose = menu.querySelector('.menu__close'),
      menuFooter = menu.querySelector('.menu__footer');

   burger.addEventListener('click', () => {
      menu.classList.add('_active');
      menuHeader.classList.add('show');
      menuHeader.classList.remove('hide');
      menuFooter.classList.remove('hide');
   })
   menuClose.addEventListener('click', () => {
      menu.classList.remove('_active');
      menuHeader.classList.remove('show');
      menuFooter.classList.remove('show');
      setTimeout(() => {
         menuHeader.classList.add('hide');
         menuFooter.classList.add('hide');
      }, 300);
   })
   //sliders
   new Swiper('.card__slider', {
      scrollbar: {
         el: '.swiper-scrollbar',
         draggable: true
      },
      grabCursor: true,
      slideToClickedSlide: true,
      // mousewheel: {
      //    sensitivity: 1,
      //    eventsTarget: '.card__slider'
      // },
      slidesPerView: 1.5,
      autoplay: {
         delay: 2500
      },
      speed: 600,
      initialSlide: 1,
      centeredSlides: true,
      breakpoints: {
         776: {
            slidesPerView: 2.5,
            initialSlide: 0,
            centeredSlides: false
         }
      },
      loop: true
   });

   new Swiper('.video__slider', {
      scrollbar: {
         el: '.swiper-scrollbar',
         draggable: true
      },
      grabCursor: true,
      slideToClickedSlide: true,
      // mousewheel: {
      //    sensitivity: 1,
      //    eventsTarget: '.card__slider'
      // },
      slidesPerView: 1.5,
      autoplay: {
         delay: 2500
      },
      speed: 600,
      initialSlide: 1,
      centeredSlides: true,
      breakpoints: {
         776: {
            slidesPerView: 5,
            initialSlide: 0,
            centeredSlides: false
         }
      },
   });
   //video navigation
   const videoTabs = document.querySelectorAll('.video__navigation-item');
   videoTabs.forEach(tab => {
      tab.addEventListener('click', () => changeTab(tab))
   })

   function changeTab(activeTab) {
      videoTabs.forEach(tab => {
         tab.classList.remove('_active');
         activeTab.classList.add('_active');
      })
   }
   //audio
   const audio = document.querySelector('audio'),
      playBtns = document.querySelectorAll('.player__play'),
      volumeBtns = document.querySelectorAll('.volume__img');

   audio.volume = 0.9;

   let currentPlayer,
      currentProgressBar,
      currentVolumeBar,
      currentTimeStart,
      currentVolume = 0.9;

   playBtns.forEach(btn => {
      btn.addEventListener('click', () => songAction(btn))
   })

   volumeBtns.forEach(btn => {
      btn.addEventListener('click', setMuted);
   })

   function playSong() {
      audio.play();
   }

   function pauseSong() {
      audio.pause();
   }

   function songAction(btn) {
      const src = btn.closest('.player').dataset.src;
      if (audio.src.split('/').pop() !== src) {
         currentPlayer = btn.closest('.audio .player');

         currentProgressBar = currentPlayer.querySelector('.player__bar');
         currentVolumeBar = currentPlayer.querySelector('.volume__bar');

         currentVolumeBar.removeEventListener('click', setVolume);
         currentVolumeBar.addEventListener('click', setVolume);

         currentTimeStart = currentPlayer.querySelector('.player__time.now p');

         currentProgressBar.removeEventListener('click', setProgress);
         currentProgressBar.addEventListener('click', setProgress);
      }

      if (btn.dataset.action === 'play') {
         if (audio.src.split('/').pop() !== src) {
            audio.src = `./assets/audio/${src}`;
         }
         playSong();
         btn.dataset.action = 'pause';
         btn.firstElementChild.src = './assets/svg/pausebtn.svg';
      } else {
         pauseSong();
         btn.dataset.action = 'play';
         btn.firstElementChild.src = './assets/svg/playbtn.svg';
      }

   }

   function updateProgress(e) {
      const {
         duration,
         currentTime
      } = e.srcElement;
      let hours = Math.floor(currentTime / 60 / 60);
      let minutes = Math.floor(currentTime / 60) - (hours * 60);
      let seconds = Math.floor(currentTime % 60);
      hours = hours > 9 ? hours : '0' + hours;
      minutes = minutes > 9 ? minutes : '0' + minutes;
      seconds = seconds > 9 ? seconds : '0' + seconds;

      const progress = (currentTime / duration) * 100;
      currentProgressBar.style.setProperty('--player-time', `${progress}%`);
      currentTimeStart.textContent = `${hours}:${minutes}:${seconds}`;
   }

   function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;

      audio.currentTime = (clickX / width) * duration;
   }

   audio.addEventListener('timeupdate', updateProgress);

   function setMuted(e) {
      if (audio.volume === 0) {
         this.firstElementChild.src = './assets/svg/volume.svg';
         audio.volume = currentVolume;
         currentVolumeBar.firstElementChild.style.setProperty('--volume', `${currentVolume * 100}%`);
      } else {
         this.firstElementChild.src = './assets/svg/muted.svg';
         audio.volume = 0;
      }
   }

   function setVolume(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const volume = clickX / width
      audio.volume = volume;
      currentVolume = volume;
      currentVolumeBar.firstElementChild.style.setProperty('--volume', `${volume * 100}%`);
   }

   //scrollbtn
   const scrollTopBtn = document.querySelector('.scrollTop');
   scrollTopBtn.addEventListener('click', scrollTop);

   function scrollTop() {
      window.scroll(0, 0);
   }
})