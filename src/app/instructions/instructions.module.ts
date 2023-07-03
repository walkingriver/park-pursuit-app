import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InstructionsPage } from './instructions.page';

const routes: Routes = [
  {
    path: '',
    component: InstructionsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        InstructionsPage
    ]
})
export class InstructionsPageModule {}
