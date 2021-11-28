import testComponent from '../../../../test-component/test-component';
import { IPage } from '../models/page.model';

export const testPage: IPage = {
  init: testComponent.init,
  render: testComponent.render,
};
