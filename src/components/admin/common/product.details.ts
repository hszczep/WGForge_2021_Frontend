import { CATEGORIES, NATIONS, TANK_TYPES } from './admin.constants';
import storage from '../../app/components/storage/storage';

export default function detailsRender() {
  const detailInfo = document.createElement('div');
  detailInfo.classList.add('full-information');
  let categories = '';
  let nations = '';
  let tankTypes = '';
  let levels = '';

  Object.entries(CATEGORIES).forEach(([key, value]) => {
    categories += `<p><input type="checkbox" data-type="${key}"/>${value}</p>`;
  });

  Object.entries(NATIONS).forEach(([key, value]) => {
    nations += `<option class="admin-option" data-nation="${key}">${value}</option>`;
  });

  Object.entries(TANK_TYPES).forEach(([key, value]) => {
    tankTypes += `<option class="admin-option" data-type="${key}">${value}</option>`;
  });

  for (let i = 1; i <= 10; i++) {
    levels += `<option class="admin-option">${i}</option>`;
  }

  const content = `
              <form>
                <div class="price-block">
                  <label>Price:<input type="text" class="input-price"/></label>
                  <label>Discounted price:<input type="text" class="input-discount_price"/></label>
                  <label>Discount:<input type="text" class="input-discout"/></label>
                  <div class="show-discount">
                    Show:
                    <select class="admin-select">
                      <option class="admin-option">Absolute</option>
                      <option class="admin-option">Percent</option>
                    </select>
                  </div>
                </div>
                <div class="title-block">
                  <label>Name:<input type="text" class="input-name"/></label>
                  <div class="card-size">
                    Size:
                    <select class="admin-select">
                      <option class="admin-option" selected>1</option>
                      <option class="admin-option">2</option>
                    </select>
                  </div>
                  <div class="card-priority">
                    <label>Order:
                      <input type="number" min="0" max="${storage.products.length}" class="input-order"/>
                    </label>
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
                  <label>Description:
                    <textarea class="textarea description-input"></textarea>
                  </label>
                </div>
                <div class="textarea-block">
                  <label>IMG:<textarea class="textarea images-input"></textarea></label>
                </div>
                <div class="buttons-block">
                  <button class="button cancel-btn">Cancel</button>
                  <button class="button save-btn">Save</button>
                </div>
              </form>
            `;
  detailInfo.innerHTML = content;
  return detailInfo;
}
