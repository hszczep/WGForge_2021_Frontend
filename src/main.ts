// Test import of styles
import './scss/main.scss';

import app from './components/app/app';

const appInit = async () => {
  app.init();
  document.removeEventListener('DOMContentLoaded', appInit);
};

window.addEventListener('DOMContentLoaded', appInit);
