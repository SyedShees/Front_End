import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Student } from '../models/Student';
import { StudentsService } from '../students.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Output() out=new EventEmitter<Student>();
  students: Student[];
  std : Student =  new Student();
  addForm= new FormGroup({
    name: new FormControl(),
    department: new FormControl()
  });

  constructor(private studentService:StudentsService) { }

  details(id: number): void{
    this.studentService.detail(id).subscribe((data) => {this.std=data[0];
    this.out.emit(this.std);
    console.log(this.std);
    });
    
    
  }

  delStudent(id: number): void{
    this.studentService.delStudent(id).subscribe((data) => {alert("Successfully Deleted...!"); window. location. reload()
    });
    console.log(id);
    
  }

  editStudent(id: number): void{
    this.studentService.detail(id).subscribe((data) => {this.std=data[0];
      
      //this.out.emit(this.std);
      console.log(this.std);
      });
    // this.studentService.delStudent(id).subscribe((data) => {alert("Successfully Deleted")
    // });
    console.log(id);
    
  }
  addStudent(name:any,department:any): void{
    
    this.studentService.addStudent(name.toString(),department.toString()).subscribe((data) => {alert("Successfully Added...!");window. location. reload()
    });
    
    
  }
  ngOnInit(): void {
    this.studentService.getStudentsList().pipe(map((data: Student[])=> {
      if(data!==null && data!==undefined){
        this.students=data;
      }
    })).subscribe();
  }

}
