// Test import of styles
import './scss/main.scss';

import app from './components/app/app';
import ProductItemComponent from './components/product-item/product-item';

const appInit = async () => {
  app.init();
  document.removeEventListener('DOMContentLoaded', appInit);

  let mainData = await fetch('https://wg-forge-back.herokuapp.com/api/products').then(res => res.json());
  console.log(mainData);

  let fragment = document.createElement('div');  
  let tank_1 = new ProductItemComponent(mainData[0]);
  let tank_2 = new ProductItemComponent(mainData[1]);
  fragment.innerHTML += tank_1.render();
  fragment.innerHTML += tank_2.render();
  document.body.append(fragment);
};

window.addEventListener('DOMContentLoaded', appInit);
