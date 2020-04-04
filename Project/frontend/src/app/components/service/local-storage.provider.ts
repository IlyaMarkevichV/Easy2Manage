import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageProvider {

  private localStorageRef: any;

  constructor() {
    this.localStorageRef = window.localStorage;
  }

  public saveItem(key: string, value: string): void {
    this.localStorageRef.setItem(key, value);
  }

  public  getItem(key: string): string {
    return this.localStorageRef.getItem(key);
  }

  public removeItem(key: string): void {
    this.localStorageRef.removeItem(key);
  }
}
