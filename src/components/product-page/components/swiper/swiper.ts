import './scss/swiper.scss';

import { hideItemAnimationEndHandler } from './common/swiper.helpers';
import {
  ALLOWED_MAX_DIST_Y,
  ALLOWED_MIN_DIST_X,
  ALLOWED_TIME,
  DIRECTIONS,
  IMG_FILTERS,
} from './common/swiper.constants';

import ProductItemInterface from '../../../../models/product-item.model';

class Swiper {
  #elements: { [key: string]: HTMLElement } = null;

  isSwipeEnabled: boolean;

  startSwipeX: number;
  startSwipeY: number;
  distSwipeX: number;
  distSwipeY: number;
  startSwipeTime: number;

  currentSlide: number;
  slidesCollection: NodeListOf<HTMLElement>;

  constructor() {
    this.isSwipeEnabled = true;

    this.startSwipeX = 0;
    this.startSwipeY = 0;
    this.distSwipeX = 0;
    this.distSwipeY = 0;
    this.startSwipeTime = 0;

    this.currentSlide = 0;
    this.slidesCollection = null;

    this.showItemAnimationEndHandler = this.showItemAnimationEndHandler.bind(this);
    this.surfaceMouseDownHandler = this.surfaceMouseDownHandler.bind(this);
    this.surfaceMouseUpHandler = this.surfaceMouseUpHandler.bind(this);

    this.previousButtonClickHandler = this.previousButtonClickHandler.bind(this);
    this.nextButtonClickHandler = this.nextButtonClickHandler.bind(this);

    this.surfaceTouchStartHandler = this.surfaceTouchStartHandler.bind(this);
    this.surfaceTouchMoveHandler = this.surfaceTouchMoveHandler.bind(this);
    this.surfaceTouchEndHandler = this.surfaceTouchEndHandler.bind(this);
  }

  changeCurrentSlide(index: number): void {
    this.currentSlide = (index + this.slidesCollection.length) % this.slidesCollection.length;
  }

  nextItem(index: number): void {
    this.hideItem('to-left');
    this.changeCurrentSlide(index + 1);
    this.showItem('from-right');
  }

  previousItem(index: number): void {
    this.hideItem('to-right');
    this.changeCurrentSlide(index - 1);
    this.showItem('from-left');
  }

  hideItem(direction: string): void {
    this.isSwipeEnabled = false;
    this.slidesCollection[this.currentSlide].classList.add(direction);
    this.slidesCollection[this.currentSlide].addEventListener('animationend', hideItemAnimationEndHandler);
  }

  showItem(direction: string): void {
    this.slidesCollection[this.currentSlide].classList.add('next', direction);
    this.slidesCollection[this.currentSlide].addEventListener('animationend', this.showItemAnimationEndHandler);
  }

  showItemAnimationEndHandler(event: Event): void {
    const target = event.target as HTMLElement;
    target.classList.remove('next', ...DIRECTIONS);
    target.classList.add('active');
    this.isSwipeEnabled = true;
    target.removeEventListener('animationend', this.showItemAnimationEndHandler);
  }

  surfaceMouseDownHandler(event: MouseEvent): void {
    this.startSwipeX = event.pageX;
    this.startSwipeY = event.pageY;
    this.startSwipeTime = Date.now();
    event.preventDefault();
  }

  surfaceMouseUpHandler(event: MouseEvent): void {
    this.distSwipeX = event.pageX - this.startSwipeX;
    this.distSwipeY = event.pageY - this.startSwipeY;

    const durationTime = Date.now() - this.startSwipeTime;

    if (
      !this.isSwipeEnabled ||
      durationTime > ALLOWED_TIME ||
      Math.abs(this.distSwipeX) < ALLOWED_MIN_DIST_X ||
      Math.abs(this.distSwipeY) > ALLOWED_MAX_DIST_Y
    )
      return;

    event.preventDefault();

    if (this.distSwipeX > 0) {
      this.previousItem(this.currentSlide);
    } else this.nextItem(this.currentSlide);
  }

  surfaceTouchStartHandler(event: TouchEvent): void {
    const target = event.target as HTMLElement;

    if ((target.classList.contains('control-wrapper') || target.classList.contains('control')) && this.isSwipeEnabled) {
      if (target.classList.contains('control-left')) {
        this.previousItem(this.currentSlide);
      } else this.nextItem(this.currentSlide);
    }

    const touchObj = event.changedTouches[0];
    this.startSwipeX = touchObj.pageX;
    this.startSwipeY = touchObj.pageY;
    this.startSwipeTime = Date.now();
  }

  surfaceTouchMoveHandler(event: TouchEvent) {
    event.preventDefault();
  }

  surfaceTouchEndHandler(event: TouchEvent) {
    const touchObj = event.changedTouches[0];

    this.distSwipeX = touchObj.pageX - this.startSwipeX;
    this.distSwipeY = touchObj.pageY - this.startSwipeY;

    const durationTime = Date.now() - this.startSwipeTime;

    if (
      !this.isSwipeEnabled ||
      durationTime > ALLOWED_TIME ||
      Math.abs(this.distSwipeX) < ALLOWED_MIN_DIST_X ||
      Math.abs(this.distSwipeY) > ALLOWED_MAX_DIST_Y
    )
      return;

    if (this.distSwipeX > 0) {
      this.previousItem(this.currentSlide);
    } else this.nextItem(this.currentSlide);
  }

  swipeDetect(surface: HTMLElement) {
    surface.addEventListener('mousedown', this.surfaceMouseDownHandler);
    surface.addEventListener('mouseup', this.surfaceMouseUpHandler);

    surface.addEventListener('touchstart', this.surfaceTouchStartHandler);
    surface.addEventListener('touchmove', this.surfaceTouchMoveHandler);
    surface.addEventListener('touchend', this.surfaceTouchEndHandler);
  }

  previousButtonClickHandler() {
    if (this.isSwipeEnabled) this.previousItem(this.currentSlide);
  }

  nextButtonClickHandler() {
    if (this.isSwipeEnabled) this.nextItem(this.currentSlide);
  }

  init(): void {
    this.slidesCollection = document.querySelectorAll('.swiper-slide');
    this.#elements = {
      previousButton: document.querySelector('.control-left'),
      nextButton: document.querySelector('.control-right'),
      swiperSurface: document.querySelector('.swiper'),
    };

    this.#elements.previousButton.addEventListener('click', this.previousButtonClickHandler);
    this.#elements.nextButton.addEventListener('click', this.nextButtonClickHandler);
    this.swipeDetect(this.#elements.swiperSurface);
  }

  unmount(): void {
    this.#elements.previousButton.removeEventListener('click', this.previousButtonClickHandler);
    this.#elements.nextButton.removeEventListener('click', this.nextButtonClickHandler);

    this.#elements.swiperSurface.removeEventListener('mousedown', this.surfaceMouseDownHandler);
    this.#elements.swiperSurface.removeEventListener('mouseup', this.surfaceMouseUpHandler);

    this.#elements.swiperSurface.removeEventListener('touchstart', this.surfaceTouchStartHandler);
    this.#elements.swiperSurface.removeEventListener('touchmove', this.surfaceTouchMoveHandler);
    this.#elements.swiperSurface.removeEventListener('touchend', this.surfaceTouchEndHandler);
  }

  renderSlides(product: ProductItemInterface): string {
    // just for testing without enough product images
    const images = product.images.length > 1 ? product.images : new Array(3).fill(product.images[0]);

    return images
      .map(
        (imageSrc, index) => `
      <div class="swiper-slide ${index === 0 ? 'active' : ''}" 
           style="${product.images.length > 1 ? '' : IMG_FILTERS[index]}"
      >
        <img class="slide-image" src="${imageSrc}" alt="${product.name}">
      </div>`
      )
      .join('');
  }

  render(product: ProductItemInterface): string {
    return `
      <div class="swiper">
        <div class="slides-container">
          ${this.renderSlides(product)}
        </div>
        <div class="control-wrapper control-wrapper-left">
          <button class="control control-left"></button>
        </div>
        <div class="control-wrapper control-wrapper-right">
          <button class="control control-right"></button>
        </div>
      </div>`;
  }
}

export default Swiper;
