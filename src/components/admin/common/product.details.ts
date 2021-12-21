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
    categories += `<p><input type="checkbox" value='${key}' name='type' data-type="${key}"/>${value}</p>`;
  });

  Object.entries(NATIONS).forEach(([key, value]) => {
    nations += `<option class="admin-option" value=${key} data-nation="${key}">${value}</option>`;
  });

  Object.entries(TANK_TYPES).forEach(([key, value]) => {
    tankTypes += `<option class="admin-option" value=${key} data-type="${key}">${value}</option>`;
  });

  for (let i = 1; i <= 10; i++) {
    levels += `<option class='admin-option'>${i}</option>`;
  }

  detailInfo.innerHTML = `
              <form id='product-form'>
                <div class='price-block'>
                  <label>Price:
                    <input required name='base_price' type='number' min='1' step='any' class='input-price'/>
                  </label>
                  <label>Discounted price:
                    <input required name='base_price_discount' 
                      type='number' min='0' step='any' class='input-discount_price'/>
                  </label>
                  <label>Discount:<input type='text' class='input-discount' name='discount' readonly /></label>
                  <div class='show-discount'>
                    Show:
                    <select name='discount_show_type' class='admin-select'>
                      <option class='admin-option' value='absolute'>Absolute</option>
                      <option class='admin-option' value='percent''>Percent</option>
                    </select>
                  </div>
                </div>
                <div class='title-block'>
                <label>id: <input type='text' class='input-id' name='id' readonly/></label>
                  <label>Name:<input type='text' class='input-name' name='name' required/></label>
                  <div class='card-priority'>
                    <label>Order:
                      <input type='number' min='0' max='${storage.products.length}' class='input-order' name='order'/>
                    </label>
                  </div>
                </div>
                <div class='category-block'>
                  Category:
                  ${categories}
                </div>

                <div class='tank-info'>
                  <div class='tank-nation'>
                    Nation:
                    <select name='nation' class='admin-select tank-select' disabled>
                      ${nations}
                    </select>
                  </div>
                  <div class='tank-type'>
                    Tank type:
                    <select name='tank_type' class='admin-select tank-select' disabled>
                      ${tankTypes}
                    </select>
                  </div>
                  <div class='tank-level'>
                    Level:
                    <select name='tier' class='admin-select tank-select' disabled>
                      ${levels}
                    </select>
                  </div>
                </div>
                <div class='textarea-block'>
                  <label>Description:
                    <textarea name='details' class='textarea description-input' required></textarea>
                  </label>
                </div>
                <div class='textarea-block'>
                  <label>IMG:<textarea name='images' class='textarea images-input'></textarea></label>
                </div>
                <div class='buttons-block'>
                  <button class='button cancel-btn' type='button'>Cancel</button>
                  <button class='button save-btn'>Save</button>
                </div>
              </form>
            `;
  return detailInfo;
}
