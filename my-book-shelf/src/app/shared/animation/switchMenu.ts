import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const switchMenuAnimation = trigger('switchMenu', [
  state(
    'false',
    style({
      display: 'none',
      opacity: 0,
      transform: 'translateY(200%)',
    })
  ),
  state(
    'true',
    style({
      display: 'block',
      opacity: 1,
      transform: 'translateY(100%)',
      bottom: '-10px',
    })
  ),
  transition('false <=> true', [animate(300)]),
]);
