import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { MensagemComponent } from './mensagem/mensagem.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { InputMaskDirective } from './../utils/input-mask.directive';
import { FocusDirective } from './../utils/focus.directive';

@NgModule({
  declarations: [
    MensagemComponent,
    LoadingComponent,
    ConfirmacaoComponent,

    InputMaskDirective,
    FocusDirective,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MensagemComponent,
    LoadingComponent,
    ConfirmacaoComponent,

    InputMaskDirective,
    FocusDirective,
  ],
})
export class SharedModule {}
