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

const nextSlide = (box, items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('carousel__item_active')) active = i;
  }
  items[active].classList.remove('carousel__item_active');
  active++;
  items[active].classList.add('carousel__item_active');
  box.style.transform = `translateX(${-25.5 - 35 * (active)}rem)`;
}

const initCarousel = () => {
  const box = document.querySelector('.carousel__box');
  const items = document.querySelectorAll('.carousel__item');
  cloneSlides(box, items);
  const interval = setInterval(nextSlide, 2000, box, items);
}


document.addEventListener('DOMContentLoaded', initCarousel);