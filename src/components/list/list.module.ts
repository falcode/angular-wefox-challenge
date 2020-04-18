import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ItemComponent } from './item/item.component';



@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [
    CommonModule
  ]
})
export class ListModule { }
