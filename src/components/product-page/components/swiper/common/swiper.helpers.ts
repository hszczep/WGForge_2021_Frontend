import { DIRECTIONS } from './swiper.constants';

export const hideItemAnimationEndHandler = (event: Event) => {
  const target = event.target as HTMLElement;
  target.classList.remove('active', ...DIRECTIONS);
  target.removeEventListener('animationend', hideItemAnimationEndHandler);
};
