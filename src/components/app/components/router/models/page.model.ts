export interface IPage {
  render: () => HTMLElement | DocumentFragment;
  init?: () => void;
  unmount?: () => void;
}
