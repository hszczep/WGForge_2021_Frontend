import { IPage } from '../models/page.model';

export const errorPage: IPage = {
  render: () => `<p class ="error"><span>404</span> Not found</p>`,
};
