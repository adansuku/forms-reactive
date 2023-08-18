import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'soy un perro'];
  signupForm: FormGroup;

  ngOnInit(): void {

    //Called after the constructor, initializing input pr operties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('soy un perro'),
      'hobbies': new FormArray([])
    });

  }

  onSubmit() {
    // console.log(this.signupForm)
    // console.log("here");
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    console.log(this.signupForm.get('hobbies').value);
  }
}
