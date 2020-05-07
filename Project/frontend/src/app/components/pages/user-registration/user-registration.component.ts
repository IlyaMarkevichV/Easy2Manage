import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../model/user';
import {Subject} from 'rxjs';
import {AuthorizationService} from '../../service/authorization.service';
import {TokenProvider} from '../../http/token.provider';
import {UserToken} from '../../model/user-token';
import {SharedEventsService} from '../../service/shared.events.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

export enum ControlFields {
  username = 'username',
  password = 'password',
  confPassword = 'confPassword',
  email = 'email'
}

@Component({
  selector: 'e2m-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['../../../../assets/styles/pages/user-registration/user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {

  private formGroup: FormGroup;
  private controlFieldsEnum = ControlFields;
  private user: User;
  private unsubscribeStream: Subject<void> = new Subject<void>();

  constructor(private authorizationService: AuthorizationService,
              private tokenProvider: TokenProvider,
              private router: Router,
              private sharedEventsService: SharedEventsService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.user = new User();
    this.initFormGroup();
  }

  private initFormGroup(): void {
    Object.keys(this.controlFieldsEnum).forEach((key: string) => {
      const formControl: FormControl = new FormControl(null, this.getValidators(key));
      formControl.valueChanges.pipe(takeUntil(this.unsubscribeStream)).subscribe(value => this.onValueChange(key, value));
      this.formGroup.addControl(key, formControl);
    });
  }

  private onValueChange(key: string, value: any) {
    this.user[key] = value;
  }

  private getValidators(key: string): ValidatorFn {
    switch (key) {
      case 'username':
        return Validators.compose([Validators.required]);
      case 'email':
        return Validators.compose([Validators.pattern(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/), Validators.required]);
      case 'password':
      case 'confPassword':
        return Validators.compose([Validators.minLength(10), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/), Validators.required]);
    }
  }

  public submitForm(): void {
    this.spinnerService.show();
    this.authorizationService.registerUser(this.user).subscribe((userTokenModel: UserToken) => {
      this.tokenProvider.saveToken(userTokenModel.token);
      this.sharedEventsService._setOnUserSignIn(userTokenModel.user);
      this.spinnerService.hide();
      this.router.navigate(['']);
    });
  }

  public isFieldInValid(key: string): boolean {
    return this.formGroup.controls[key].invalid;
  }

  public getErrorText(key: string): string {
    const control: AbstractControl = this.formGroup.controls[key];
    if (control.touched) {
      if (control.errors['required']) {
        return 'Mandatory field';
      } else if (control.errors['pattern']) {
        return 'Text is mismatching the pattern';
      } else if (control.errors['minlength']) {
        return 'Password should be 10+ characters length';
      }
    }
  }

}
