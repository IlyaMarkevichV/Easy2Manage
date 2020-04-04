import {Injectable} from '@angular/core';
import {LocalStorageProvider} from '../service/local-storage.provider';


const TOKEN_LOCAL_STORAGE_KEY = "AuthToken";

@Injectable({
  providedIn: "root"
})
export class TokenProvider {

  constructor(private localStorage: LocalStorageProvider) {
  }

  public getToken(): string {
    return this.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  }

  public saveToken(token: string): void {
    this.localStorage.saveItem(TOKEN_LOCAL_STORAGE_KEY, token);
  }


  public removeToken(): void {
    this.localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  }


}
