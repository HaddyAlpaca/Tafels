import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TafelsOefenenComponent } from './tafels-oefenen.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [TafelsOefenenComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
