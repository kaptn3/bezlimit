const countClonedSlides = 2;
let active = countClonedSlides;

const createSlide = (i, items) => {
  const elm = items[i].cloneNode(true);
  elm.classList.remove('carousel__item_active');
  elm.classList.add('carousel__item_cloned');
  return elm;
}

const cloneSlides = (box, items) => {
  box.prepend(createSlide(items.length - 1, items));
  box.prepend(createSlide(items.length - 1, items));
  box.append(createSlide(0, items));
  box.append(createSlide(0, items));
}

const classHandle = (prev, current) => {
  prev.classList.remove('carousel__item_active');
  current.classList.add('carousel__item_active');
}

const moveBoxHandle = (box) => {
  box.style.transform = `translateX(${-25.5 - 35 * (active - 1)}rem)`;
}

const nextSlide = () => {
  const box = document.querySelector('.carousel__box');
  const items = document.querySelectorAll('.carousel__item');
  const lastIndex = items.length - countClonedSlides;
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('carousel__item_active')) active = i;
    items[i].removeAttribute('style');
  }
  active++;

  box.classList.add('carousel__box_animate');
  moveBoxHandle(box);
  setTimeout(() => {
    box.classList.remove('carousel__box_animate');
    if (active === lastIndex) {
      items[active].style.transition = 'none';
      items[countClonedSlides].style.transition = 'none';
      classHandle(items[active], items[countClonedSlides]);
      active = countClonedSlides;
      moveBoxHandle(box);
    }
  }, 500);

  classHandle(items[active - 1], items[active]);
}

const initCarousel = () => {
  const box = document.querySelector('.carousel__box');
  const items = document.querySelectorAll('.carousel__item');
  cloneSlides(box, items);
  const interval = setInterval(nextSlide, 4000);
}


document.addEventListener('DOMContentLoaded', initCarousel);