// Test import of styles
import './scss/main.scss';

import app from './components/app/app';
import ProductItemComponent from './components/product-item/product-item';

const appInit = () => {
  app.init();
  document.removeEventListener('DOMContentLoaded', appInit);
  let fragment = document.createElement('div');  
  let tank_1 = new ProductItemComponent(mainData);
  fragment.innerHTML = tank_1.render();
  document.body.append(fragment);
};

window.addEventListener('DOMContentLoaded', appInit);


const mainData = {
  tier: 5,
  type: "machinery",
  name: "T-34",
  price: 71,
  nation: "ussr",
  images: [
  "http://api-console.worldoftanks.com/static/2.70/wotx/encyclopedia/tanks/big_ussr_r04_t_34.png"
  ],
  details: "The legend of the Soviet armored forces and the most widely-produced Soviet tank of World War II, with a total of 33,805 vehicles manufactured. Three variants of this model were produced at several Soviet factories from 1940 through 1944.",
  tank_type: "mediumTank",
  id: "61a2d7ace2cd2550164b8144"
}