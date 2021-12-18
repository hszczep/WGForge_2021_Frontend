import ProductItemInterface from '../../../models/product-item.model';
import { CATEGORIES, NATIONS, TANK_TYPES } from './admin.constants';
import storage from '../../app/components/storage/storage';

export default function detailsRender(item: ProductItemInterface) {
  const detailInfo = document.createElement('div');
  detailInfo.classList.add('item-info');
  let categories = '';
  let nations = '';
  let tankTypes = '';
  let levels = '';

  Object.entries(CATEGORIES).forEach(([key, value]) => {
    if (item.type.includes(key.toLocaleLowerCase())) categories += `<p><input type="checkbox" checked/>${value}</p>`;
    else categories += `<p><input type="checkbox"/>${value}</p>`;
  });

  if (item.nation || item.tier || item.tank_type) {
    Object.entries(NATIONS).forEach(([key, value]) => {
      if (item.nation === key)
        nations += `<option class="admin-option" data-nation="${key}" selected>${value}</option>`;
      else nations += `<option class="admin-option" data-nation="${key}">${value}</option>`;
    });

    Object.entries(TANK_TYPES).forEach(([key, value]) => {
      if (item.tank_type.toLocaleLowerCase() === key)
        tankTypes += `<option class="admin-option" data-type="${key}" selected>${value}</option>`;
      else tankTypes += `<option class="admin-option" data-type="${key}">${value}</option>`;
    });

    for (let i = 1; i <= 10; i++) {
      if (item.tier === i) levels += `<option class="admin-option" selected>${i}</option>`;
      else levels += `<option class="admin-option">${i}</option>`;
    }
  }

  const discountAbsolute = 'absolute';
  const discountPercent = 'percent';

  const content = `
            <div class="full-information">
              <form>
                <div class="price-block">
                  <label>Price:
                  <input type="text" value="${item.base_price}"/>
                  </label>
                  <label>Discounted price:<input type="text" value="${item.base_price_discount}"/></label>
                  <label>Discount:<input type="text" value="${item.discount}"/></label>
                  <div class="show-discount">
                    Show:
                    <select class="admin-select">
                      <option class="admin-option" ${item.discount_show_type === discountAbsolute ? 'selected' : ''}>
                        Absolute
                      </option>
                      <option class="admin-option" ${item.discount_show_type === discountPercent ? 'selected' : ''}>
                        Percent
                      </option>
                    </select>
                  </div>
                </div>
                <div class="title-block">
                  <label>Name:<input type="text" value="${item.name}"/></label>
                  <div class="card-size">
                    Size:
                    <select class="admin-select">
                      <option class="admin-option" selected>1</option>
                      <option class="admin-option">2</option>
                    </select>
                  </div>
                  <div class="card-priority">
                    <label>Order:
                      <input type="number" 
                              value="${item.has_order ? item.has_order : 0}" min="0" max="${storage.products.length}"/>
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
                    <textarea class="textarea description-input">${item.details}</textarea>
                  </label>
                </div>
                <div class="textarea-block">
                  <label>IMG:<textarea class="textarea images-input">${item.images[0]}</textarea></label>
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
