import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MapModule } from 'components/map/map.module';
import { FormModule } from 'components/form/form.module';
import { ListModule } from 'components/list/list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MapModule,
    FormModule,
    ListModule
  ]
})
export class HomeModule { }
