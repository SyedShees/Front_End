import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Student } from '../models/Student';
import { StudentsService } from '../students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Output() out=new EventEmitter<Student>();
  students: Student[];
  std : Student =  new Student();

  constructor(private studentService:StudentsService) { }

  details(id: number): void{
    this.studentService.detail(id).subscribe((data) => {this.std=data[0];
    this.out.emit(this.std);
    });
    console.log(this.std);
    
  }

  ngOnInit(): void {
    this.studentService.getStudentsList().pipe(map((data: Student[])=> {
      if(data!==null && data!==undefined){
        this.students=data;
      }
    })).subscribe();
  }

}
