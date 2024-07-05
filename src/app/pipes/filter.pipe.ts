import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../models/student.model";

@Pipe({
  name: 'filter',
  standalone: true,
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(studentList: Student[], gender:string): Student[] {
    switch (gender){
      case 'All':
        return studentList;
      case 'Male':
       return  studentList.filter(student=>student.gender==='Male');
      case 'Female':
         return studentList.filter(student=>student.gender==='Female')
      default:
        return [];

    }
  }

}
