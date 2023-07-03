import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.page.html',
    styleUrls: ['./progress.page.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class ProgressPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
