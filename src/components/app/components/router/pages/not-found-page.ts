import { IPage } from '../models/page.model';

export const notFoundPage: IPage = {
  render: () => `<p class="error"><span>404</span> Page Not Found</p>`,
};
