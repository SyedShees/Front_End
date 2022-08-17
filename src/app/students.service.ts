import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Student } from './models/Student';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpclient: HttpClient) { }
  
  getStudentsList(): Observable<Student[]>
  {
    return this.httpclient.get<Student[]>('http://localhost/Emp/getemp');
  }

  detail(id: number): Observable<Student>
  {
    return this.httpclient.get<Student>('http://localhost/Emp/getempdetails?id='+id);
  }

  delStudent(id: number): Observable<Object>
  {
    return this.httpclient.delete('http://localhost/Emp/delEmp?id='+id);
    alert("deleted");
  }

}
