// Test import of styles
import './scss/main.scss';

import app from './components/app/app';
import ProductItemComponent from './components/product-item/product-item';

const appInit = async () => {
  app.init();
  document.removeEventListener('DOMContentLoaded', appInit);

  let mainData = await fetch('https://wg-forge-back.herokuapp.com/api/products').then(res => res.json());

  let fragment = document.createElement('div');  

  for (let i = 0; i < 2; i++){
    let item = new ProductItemComponent(mainData[i]);
    fragment.innerHTML += item.render();
  }

  document.body.append(fragment);
};

window.addEventListener('DOMContentLoaded', appInit);
