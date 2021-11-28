import { IPage } from '../models/page.model';

export const errorPage: IPage = {
  render: () => `
      <div class="navigation">
        <a class="navigation-link link" href="#/">Main page</a>
        <a class="navigation-link link" href="#/test">Test page</a>
      </div>
      <p class ="error"><span>404</span> Not found</p>
    `,
};
