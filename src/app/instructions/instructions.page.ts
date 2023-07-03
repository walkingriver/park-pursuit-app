import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.page.html',
    styleUrls: ['./instructions.page.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class InstructionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
