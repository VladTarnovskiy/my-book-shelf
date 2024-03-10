import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

@NgModule({
  imports: [StoreModule.forFeature('router', routerReducer)],
})
export class RouterStoreModule {}
