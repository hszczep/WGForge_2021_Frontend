import favoritesPageComponent from '../../../../favorites/favorites';
import { IPage } from '../models/page.model';

export const favoritesPage: IPage = {
  init: favoritesPageComponent.init,
  unmount: favoritesPageComponent.unmount,
  render: favoritesPageComponent.render,
};
