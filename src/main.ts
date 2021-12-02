// Test import of styles
import './scss/main.scss';

import app from './components/app/app';
import ProductItemComponent from './components/product-item/product-item';

const appInit = async () => {
  app.init();
  document.removeEventListener('DOMContentLoaded', appInit);
};

window.addEventListener('DOMContentLoaded', appInit);
