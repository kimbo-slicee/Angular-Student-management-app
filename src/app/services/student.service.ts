import {Injectable, numberAttribute} from '@angular/core';
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 studentList:Student[]=[
   new Student(1, 'Mohammed', 'Male', new Date('11-12-1997'), 'MBA', 520, 1899),
   new Student(2, 'Ahmed', 'Male', new Date('10-06-1998'), 'B.Tech', 420, 2899),
   new Student(3, 'Sara', 'Female', new Date('09-22-1996'), 'B.Tech', 540, 2899),
   new Student(4, 'maryam', 'Female', new Date('06-12-1995'), 'MBA', 380, 15899),
   new Student(5, 'Yassin', 'Male', new Date('12-21-1999'), 'B.Tech', 430, 7499),
   new Student(6, 'amine', 'Male', new Date('06-18-1997'), 'M.Sc', 320, 7399),
   new Student(7, 'khalid', 'Male', new Date('06-18-1997'), 'B.Tech', 320, 2799),
   new Student(8, 'ayman', 'Male', new Date('06-18-1997'), 'M.Sc', 320, 100),
 ]
  constructor() { }
  createStudent(name:string,gender:string,dob:Date,course:string,marks:number,fee:number){
   let userId:number=this.studentList.length;
   let newStudent:Student= new Student(userId,name,gender,dob,course,marks,fee);
   this.studentList.push(newStudent);
  };

 getTotalMarks(){
   let totlMarks:number=0
   for(let i=0; i<this.studentList.length ; i++){
     totlMarks+=this.studentList[i].marks
   }
   return totlMarks;
 }

}
