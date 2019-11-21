let active = 1;

const moveSlides = (box, items) => {
  box.prepend(items[items.length - 1]);
}

const createSlide = (i, items) => {
  const elm = items[i].cloneNode(true);
  elm.classList.add('carousel__item_cloned');
  return elm;
}

const cloneSlides = (box, items) => {
  box.prepend(createSlide(items.length - 1, items));
  box.append(createSlide(0, items));
}

const initCarousel = () => {
  const box = document.querySelector('.carousel__box');
  const items = document.querySelectorAll('.carousel__item');
  cloneSlides(box, items);
  //const interval = setInterval(nextSlide, 4000);
}


document.addEventListener('DOMContentLoaded', initCarousel);