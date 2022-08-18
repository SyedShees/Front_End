import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Student } from './models/Student';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front_End';
  public std: Student;
  
}
