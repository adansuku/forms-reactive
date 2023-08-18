import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export default class AppComponent implements OnInit {
  genders = ['male', 'female', 'soy un perro'];
  signupForm: FormGroup;
  forbiddenUserNames = ['caca', 'pedo'];

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input pr operties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('soy un perro'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   });

    this.signupForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
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

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) != -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'email is forbidden': true })
        } else {
          resolve(null);
        }
      }, 1400)
    });
    return promise;
  }
}
