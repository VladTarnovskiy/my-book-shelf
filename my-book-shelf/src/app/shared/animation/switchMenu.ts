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
      visibility: 'hidden',
      opacity: 0,
      transform: 'translateY(200%)',
    })
  ),
  state(
    'true',
    style({
      visibility: 'visible',
      opacity: 1,
      transform: 'translateY(100%)',
      bottom: '-10px',
    })
  ),
  transition('false => true', [animate('0.3s')]),
  transition('true => false', [animate('0.3s 0.3s')]),
]);
