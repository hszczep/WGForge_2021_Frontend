import { CATEGORIES, NATIONS, TANK_TYPES } from './admin.constants';

export const renderAdminItem = (): string => {
  let categories = '';
  CATEGORIES.forEach((el) => {
    categories += `<p><input type="checkbox" />${el}</p>`;
  });
  let nations = '';
  NATIONS.forEach((el) => {
    nations += `<option class="admin-option">${el}</option>`;
  });
  let tankTypes = '';
  TANK_TYPES.forEach((el) => {
    tankTypes += `<option class="admin-option">${el}</option>`;
  });
  let levels = '';
  for (let i = 1; i <= 10; i++) {
    levels += `<option class="admin-option">${i}</option>`;
  }
  return `
<article class="item-card active-card">
            <div class="basic-information">
              <div class="item-info item-name">T34</div>
              <div class="item-info">5</div>
              <div class="item-info">$ 20</div>
              <div class="item-info">5</div>
              <div class="item-info">1</div>
              <div class="item-info item-img">
                <img
                  src="http://api-console.worldoftanks.com/static/2.70/wotx/encyclopedia/tanks/big_usa_a21_t14.png"
                  alt="name"
                />
              </div>
              <div class="item-info">
                <svg class="delete-button">
                  <use xlink:href="assets/images/sprite.svg#close"></use>
                </svg>
              </div>
            </div>
            <div class="full-information">
              <form>
                <div class="price-block">
                  <label>Price:<input type="text" /></label>
                  <label>Discounted price:<input type="text" /></label>
                  <label>Discount:<input type="text" /></label>
                  <div class="show-discount">
                    Show:
                    <select class="admin-select">
                      <option class="admin-option">absolute</option>
                      <option class="admin-option">percentage</option>
                    </select>
                  </div>
                </div>
                <div class="title-block">
                  <label>Name:<input type="text" /></label>
                  <div class="card-size">
                    Size:
                    <select class="admin-select">
                      <option class="admin-option">1</option>
                      <option class="admin-option">2</option>
                    </select>
                  </div>
                  <div class="card-priority">
                    Priority:
                    <select class="admin-select">
                      <option class="admin-option">1</option>
                      <option class="admin-option">2</option>
                      <option class="admin-option">3</option>
                      <option class="admin-option">4</option>
                      <option class="admin-option">5</option>
                    </select>
                  </div>
                </div>
                <div class="category-block">
                  Category:
                  ${categories}
                </div>

                <div class="tank-info">
                  <div class="tank-nation">
                    Nation:
                    <select class="admin-select">
                      ${nations}
                    </select>
                  </div>
                  <div class="tank-type">
                    Tank type:
                    <select class="admin-select">
                      ${tankTypes}
                    </select>
                  </div>
                  <div class="tank-level">
                    Level:
                    <select class="admin-select">
                      ${levels}
                    </select>
                  </div>
                </div>
                <div class="textarea-block">
                  <label>Description:<textarea class="textarea description-input"></textarea></label>
                </div>
                <div class="textarea-block">
                  <label>IMG:<textarea class="textarea images-input"></textarea></label>
                </div>
                <div class="buttons-block">
                  <button class="button cancel-btn">Cancel</button>
                  <button class="button save-btn">Save</button>
                </div>
              </form>
            </div>
          </article>
`;
};
