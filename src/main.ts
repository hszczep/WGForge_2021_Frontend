// Test import of styles
import './scss/main.scss';

// import app from './components/app/app';

import mainApiService from './services/main-api.service';

const appInit = async () => {
  // app.init();

  const userCredentials = { email: 'example2@example.com', password: 'longerThen6' };

  const products = await mainApiService.getProducts();
  console.log(products);

  const registerUserData = await mainApiService.registerUser(userCredentials);
  console.log(registerUserData);

  const { token } = await mainApiService.loginUser(userCredentials) || { token: null };
  console.log(token);

  const userData = await mainApiService.getUser(token);
  console.log(userData);

  document.removeEventListener('DOMContentLoaded', appInit);
};

window.addEventListener('DOMContentLoaded', appInit);
