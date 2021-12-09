import { IPage } from '../models/page.model';

export const errorPage: IPage = {
  render: () => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.innerHTML = '<span>404</span> Not found';
    return errorMessage;
  },
};
