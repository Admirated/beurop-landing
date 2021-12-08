window.addEventListener('DOMContentLoaded', () => {
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
})