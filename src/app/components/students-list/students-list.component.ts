import {Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {FooterComponent} from "../footer/footer.component";
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/student.model";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPipe} from "../../pipes/filter.pipe";

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CurrencyPipe,
    NgIf,
    NgForOf,
    PercentPipe,
    ReactiveFormsModule,
    FormsModule,
    FilterPipe,
    DatePipe
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit{
  studentService: StudentService = inject(StudentService);
  isEditing: boolean = false;
  isInserting: boolean = false;
  stdIdToEdit!: number;
  students!: Student[];
  totalMarks!: number;
  //PROPERTIES FOR INSERTING
  @ViewChild('name') Name!: ElementRef;
  @ViewChild('gender') Gender!: ElementRef;
  @ViewChild('dob') Dob!: ElementRef;
  @ViewChild('course') Course!: ElementRef;
  @ViewChild('marks') Marks!: ElementRef;
  @ViewChild('fee') Fee!: ElementRef;
  //PROPERTIES FOR EDITING
  @ViewChild('editName') editName!: ElementRef;
  @ViewChild('editGender') editGender!: ElementRef;
  @ViewChild('editDob') editDob!: ElementRef;
  @ViewChild('editCourse') editCourse!: ElementRef;
  @ViewChild('editMarks') editMarks!: ElementRef;
  @ViewChild('editFee') editFee!: ElementRef;
  selectedGender:string='All'
  ngOnInit(){
    this.students = this.studentService.studentList;
    this.totalMarks = this.studentService.getTotalMarks();
  }

  OnInsertClicked(){
    this.isInserting = true;
  }
  OnInsertCancelled(){
    this.isInserting = false;
  }
  OnInsertSaved(){
    this.studentService.createStudent(
      this.Name.nativeElement.value,
      this.Gender.nativeElement.value,
      this.Dob.nativeElement.value,
      this.Course.nativeElement.value,
      this.Marks.nativeElement.value,
      this.Fee.nativeElement.value
    );
    this.isInserting = false;
    this.students=this.studentService.findByGender(this.selectedGender)
  }

  OnEditClicked(stdId: number){
    this.isEditing = true;
    this.stdIdToEdit = stdId;
  }
  OnEditCancelled(){
    this.isEditing = false;
  }

  OnEditSaved(student: Student){
    student.name = this.editName.nativeElement.value;
    student.gender = this.editGender.nativeElement.value;
    student.dob = this.editDob.nativeElement.value;
    student.course = this.editCourse.nativeElement.value;
    student.marks = this.editMarks.nativeElement.value;
    student.fee = this.editFee.nativeElement.value;
    this.isEditing = false;
    this.students=this.studentService.findByGender(this.selectedGender);


  }


  findStudentByGender(select: HTMLSelectElement) {
    this.selectedGender=select.value;
    this.students=this.studentService.findByGender(select.value);
  }
}
