import './scss/product-item-clone.style.scss';

function addPurchase(event: Event) {
  const button = event.target as HTMLElement;
  button.setAttribute('disabled', 'true');
  button.removeEventListener('click', addPurchase);
  const cardProduct = button.parentElement;
  const cardClone = cardProduct.cloneNode(true) as HTMLElement;
  cardClone.classList.add('card-clone');

  const cardWidth = cardProduct.offsetWidth;
  const cardHeight = cardProduct.offsetHeight;
  const cardTop = cardProduct.offsetTop;
  const cardLeft = cardProduct.offsetLeft;

  cardClone.setAttribute(
    'style',
    `width: ${cardWidth}px; height: ${cardHeight}px; 
                          top: ${cardTop}px; left: ${cardLeft}px`
  );

  const shoppingCart: HTMLElement = document.querySelector('#cart');

  const shoppingCartWidth = shoppingCart.offsetWidth;
  const shoppingCartHeight = shoppingCart.offsetHeight;
  const shoppingCartTop = shoppingCart.offsetTop;
  const shoppingCartLeft = shoppingCart.offsetLeft;

  document.body.append(cardClone);

  window.requestAnimationFrame(() => {
    cardClone.style.transform = `translate3d(${
      shoppingCartLeft + shoppingCartWidth / 2 - (cardLeft + cardWidth / 2)
    }px, 
        ${shoppingCartTop + shoppingCartHeight / 2 - (cardTop + cardHeight / 2)}px, 0) scale(.3)`;
    cardClone.style.opacity = '0';
  });
  setTimeout(() => {
    cardClone.remove();
  }, 1000);
}

export default addPurchase;
