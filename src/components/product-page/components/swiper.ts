let currentItem = 0;
let isEnabled = true;

let caruselItems: NodeListOf<HTMLElement> = null;

function changeCurrentItem(index: number) {
  currentItem = (index + caruselItems.length) % caruselItems.length;
}

function hideItem(direction: string) {
  isEnabled = false;
  caruselItems[currentItem].classList.add(direction);
  caruselItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showItem(direction: string) {
  caruselItems[currentItem].classList.add('next', direction);
  caruselItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function nextItem(index: number) {
  hideItem('to-left');
  changeCurrentItem(index + 1);
  showItem('from-right');
}

function previousItem(index: number) {
  hideItem('to-right');
  changeCurrentItem(index - 1);
  showItem('from-left');
}

const swipeDetect = (surface: HTMLElement) => {
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let durationTime = 0;

  const ALLOWED_MIN_DIST_X = 50;
  const ALLOWED_MAX_DIST_Y = 50;
  const ALLOWED_TIME = 500;

  surface.addEventListener('mousedown', (event: MouseEvent) => {
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  });

  surface.addEventListener('mouseup', (event: MouseEvent) => {
    distX = event.pageX - startX;
    distY = event.pageY - startY;
    durationTime = new Date().getTime() - startTime;
    if (durationTime <= ALLOWED_TIME) {
      if (Math.abs(distX) >= ALLOWED_MIN_DIST_X && Math.abs(distY) <= ALLOWED_MAX_DIST_Y) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    event.preventDefault();
  });

  surface.addEventListener('touchstart', (event: TouchEvent) => {
    const target = event.target as HTMLElement;

    // if (target.classList.contains('carousel--button')
    //   || target.classList.contains('carousel--control')) {
    //   if (target.classList.contains('carousel--button-previous')
    //     || target.classList.contains('carousel--control-previous')) {
    //     if (isEnabled) {
    //       previousItem(currentItem);
    //     }
    //   } else if (isEnabled) {
    //     nextItem(currentItem);
    //   }
    // }

    if (target.classList.contains('control-wrapper') || target.classList.contains('control')) {
      if (target.classList.contains('control-left')) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (isEnabled) {
        nextItem(currentItem);
      }
    }

    const touchObj = event.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('touchmove', (event: TouchEvent) => event.preventDefault());

  surface.addEventListener('touchend', (event: TouchEvent) => {
    const touchObj = event.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    durationTime = new Date().getTime() - startTime;

    if (durationTime <= ALLOWED_TIME) {
      if (Math.abs(distX) >= ALLOWED_MIN_DIST_X && Math.abs(distY) <= ALLOWED_MAX_DIST_Y) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
  });
};

export const swiperInit = () => {
  caruselItems = document.querySelectorAll('.carousel-item');
  const previousBtnBox = document.querySelector('.control-left');
  const nextBtnBox = document.querySelector('.control-right');
  const surface = document.querySelector('.carousel') as HTMLElement;

  previousBtnBox.addEventListener('click', () => {
    if (isEnabled) previousItem(currentItem);
  });

  nextBtnBox.addEventListener('click', () => {
    if (isEnabled) nextItem(currentItem);
  });

  swipeDetect(surface);
};
