export interface IPage {
  render: () => string,
  init?: () => void,
  unmount?: () => void,
} 