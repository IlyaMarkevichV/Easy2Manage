import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthorizationService} from '../../../../service/authorization.service';
import {UserToken} from '../../../../model/user-token';
import {TokenProvider} from '../../../../http/token.provider';
import {User} from '../../../../model/user';
import {Router} from '@angular/router';

export enum ControlFields {
  username = 'username',
  password = 'password'
}

@Component({
  selector: 'e2m-authorization-popup',
  templateUrl: './authorization-popup.component.html',
  styleUrls: ['../../../../../../assets/styles/shared/navigation-bar/components/authorization-popup.component.less']
})
export class AuthorizationPopupComponent implements OnInit {

  @Input()
  public visible: boolean;

  public user: User;
  private formGroup: FormGroup;
  private controlFieldsEnum: any = ControlFields;
  private unsubscribeStream: Subject<void> = new Subject<void>();
  public buttonName: string = 'Log In';

  @Output()
  public onAuthorize: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();


  constructor(private authorizationService: AuthorizationService,
              private tokenProvider: TokenProvider,
              private router: Router) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.user = new User();
    this.initFormGroup();
  }

  private initFormGroup(): void {
    Object.keys(this.controlFieldsEnum).forEach((key: string) => {
      const formControl: FormControl = new FormControl(null, Validators.required);
      formControl.valueChanges.pipe(takeUntil(this.unsubscribeStream)).subscribe(value => this.onValueChange(key, value));
      this.formGroup.addControl(key, formControl);
    });
  }

  private onValueChange(key: string, value: any) {
    this.user[key] = value;
  }

  public authorizeUser(): void {
    this.authorizationService.authorizeUser(this.user).subscribe((userTokenModel: UserToken) => {
      this.tokenProvider.saveToken(userTokenModel.token);
      this.onAuthorize.next(userTokenModel.user);
    });
  }

  public _onClose(): void {
    this.onClose.emit();
    this.visible = false;
  }

  public navigateToRegistration(): void {
    this._onClose();
    this.router.navigate(['registration']);
  }

}
