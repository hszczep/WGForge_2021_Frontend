import './scss/admin.styles.scss';

class AdminPageComponent {
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('It is Admin Page');
  }

  unmount(): void {}

  render(): string {
    return '<h1 style="color: white;">Admin Page</h1>';
  }
}

export default new AdminPageComponent();
