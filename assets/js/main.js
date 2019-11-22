const countClonedPrepend = 1;
const countClonedAppend = 2;
let active = countClonedPrepend;

const createSlide = (i, items) => {
  const elm = items[i].cloneNode(true);
  elm.classList.remove('carousel__item_active');
  elm.classList.add('carousel__item_cloned');
  return elm;
}

const cloneSlides = (box, items) => {
  box.prepend(createSlide(items.length - 1, items));
  box.append(createSlide(0, items));
  box.append(createSlide(0, items));
}

const classHandle = (prev, current) => {
  prev.classList.remove('carousel__item_active');
  current.classList.add('carousel__item_active');
}

const moveBoxHandle = (box) => {
  const size = document.body.clientWidth > 1296 ? `${-25.5 - 35 * (active - 1)}rem` : `${-100 * (active)}vw`;
  box.style.transform = `translateX(${size})`;
}

const nextSlide = () => {
  const box = document.querySelector('.carousel__box');
  const items = document.querySelectorAll('.carousel__item');
  const lastIndex = items.length - countClonedAppend;
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
      items[countClonedPrepend].style.transition = 'none';
      classHandle(items[active], items[countClonedPrepend]);
      active = countClonedPrepend;
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
  moveBoxHandle(box);
}

const openTariff = (more) => {
  more.classList.toggle('phone__more_show');
}

const constructorModal = (phone) => {
  let note = '', inputUserPhone = '';

  if (phone) {
    inputUserPhone = `<input class="book-form__input" type="tel" name="phone-book" value="${phone}" hidden>`;
    note = '<span class="book-form__note">Для бронирования этого номера оставьте ваше имя и телефон.</span>';
  } else {
    note = '<span class="book-form__note">Для получения доступа к номерам оставьте ваше имя и телефон.</span>';
  }

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('onclick', 'openModal("", event)');
  modal.innerHTML = `<div class="modal" onclick="">
    <div class="modal__inner">
      <div class="modal__close" onclick="openModal()">
        <img src="assets/img/icons/close.svg">
      </div>
      <form class="book-form" onsubmit="submitBookForm(event)">
        ${note}
        <input class="book-form__input" type="text" name="name" placeholder="Ваше имя" pattern="[а-яА-Я]+" data-type="name" required>
        <input class="book-form__input" type="tel" name="phone" placeholder="Ваш номер" data-type="tel" required>
        ${inputUserPhone}
        <button class="book-form__btn">Отправить заявку</button>
        <small class="book-form__small"><sup>*</sup> Настоящим подтверждаю, что я ознакомлен и <a href="privacy_policy.pdf" target="_blank">согласен на обработку персональных данных</a>.</small>
      </form>
    </div>
  </div>`;

  return modal;
}

const openModal = (phone, e) => {
  const modal = document.querySelector('.modal');

  // click out modal
  if (e) {
    if (e.target.classList.contains('modal')) {
      modal.remove();
    }
  } else {
    if (modal) {
      modal.remove();
    } else {
      document.body.append(constructorModal(phone));
      initInputMasks();
    }
  }
}

const initClickTariffs = () => {
  const items = document.querySelectorAll('.phone__item');
  for (let i = 0; i < items.length; i++) {
    const span = items[i].querySelector('.phone__number');
    const bookBtn = items[i].querySelector('.phone__book');
    const more = items[i].querySelector('.phone__more');
    const tariff = items[i].querySelector('.phone__name-tariff');
    tariff.addEventListener('click', () => { openTariff(more); });
    bookBtn.addEventListener('click', () => { openModal(span.innerText); });
  }
}

const initPhoneMenu = () => {
  const links = document.querySelectorAll('.phone__menu-item');
  const div = document.querySelector('.phone__menu-item-active');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
      div.style.left = `${i * links[i].offsetWidth}px`;
    });
  }
}

const submitBookForm = (e) => {
  e.preventDefault();
  e.target.innerHTML = 'Заявка отправлена. Мы свяжемся с Вами в ближайшее рабочее время!';
}

const submitWantDealerForm = (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.get-form__btn');
  btn.innerText = 'Заявка отправлена!';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = 'Хочу стать дилером';
    btn.disabled = false;
  }, 3000);
}

const initInputMasks = () => {
  const inputs = document.querySelectorAll('input[data-type="tel"]');
  for (let i = 0; i < inputs.length; i++) {
    let maskOption = {
      mask: '+{7} (000) 000-00-00'
    }
    const mask = IMask(inputs[i], maskOption);
  }

  const nameInputs = document.querySelectorAll('input[data-type="name"]');
  for (let i = 0; i < nameInputs.length; i++) {
    let maskOption = {
      mask: '[aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa]'
    }
    const mask = IMask(nameInputs[i], maskOption);
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);
document.addEventListener('DOMContentLoaded', initClickTariffs);
document.addEventListener('DOMContentLoaded', initPhoneMenu);
document.addEventListener('DOMContentLoaded', initInputMasks);