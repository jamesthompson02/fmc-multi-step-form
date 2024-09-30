import { Component } from '@angular/core';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';
import { IconImgComponent } from './components/icon-img/icon-img.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiStepFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
