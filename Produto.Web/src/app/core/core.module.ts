import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpService } from './http.service';
import { MaterialModule } from '../shared/material.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }],
})
export class CoreModule {}
