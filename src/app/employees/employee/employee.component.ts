import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service : EmployeeService,
    private firestore : AngularFirestore,
    private toastr : ToastrService,) { }

  ngOnInit() {
    this.resetForm();
  }

  //reset Function
  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
      this.service.formData = {
        id : null,
        name : '',
        empCode : '',
        position : '',
        mobile : '',
      }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({}, form.value);
    delete data.id;
    if(form.value.id == null)   //Check Hidden ID value
      this.firestore.collection('employees').add(data);   //Insert Function
    else
      this.firestore.doc('employees/'+form.value.id).update(data)   //Update Function
    this.resetForm(form);
    this.toastr.success('Submitted Successfully..!','Employee App');
  }
}
