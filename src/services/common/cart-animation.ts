export default function addToCartAnimation(element: HTMLElement) {
  const cardClone = element.cloneNode(true) as HTMLElement;
  cardClone.classList.add('card-clone');

  const cardWidth = element.offsetWidth;
  const cardHeight = element.offsetHeight;
  const cardTop = element.offsetTop;
  const cardLeft = element.offsetLeft;

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

  const delayToRemove = 1000;

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
  }, delayToRemove);
}
