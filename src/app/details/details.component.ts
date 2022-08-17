import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../models/Student';
import { StudentsService } from '../students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() inp: Student;
  @Output() out=new EventEmitter<Student>;
  std:Student= new Student();


  constructor(private studentService:StudentsService) { }

  delStudent(id: number): void{
    this.studentService.delStudent(id).subscribe((data) => {alert("Successfully Deleted")
    });
    console.log(this.std);
    
  }

  ngOnInit(): void {
  }

}
