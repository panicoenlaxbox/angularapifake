import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from "./user";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export abstract class UsersServiceBase {
  public abstract getUsers(): Observable<User[]>;
}

@Injectable()
export class UsersServiceStub extends UsersServiceBase {

  public getUsers(): Observable<User[]> {
    console.log("UsersServiceStub");
    console.log(environment);
    let users: User[] = [];
    users.push(User.Create(1, "Sergio", 41));
    users.push(User.Create(2, "Jimena", 7));
    return Observable.of(users);
  }
}


@Injectable()
export class UsersService extends UsersServiceBase {

  public getUsers(): Observable<User[]> {
    console.log("UsersService");
    let users: User[] = [];
    users.push(User.Create(1, "Sergio", 41));
    users.push(User.Create(2, "Jimena", 7));
    return Observable.of(users);
  }
}

@Injectable()
export class UsersServiceApi extends UsersServiceBase {

  constructor(private httpClient: HttpClient) {
    super();
  }
  public getUsers(): Observable<User[]> {
    const url = `${environment.url}/users`;
    return this.httpClient.get<User[]>(url).map((users: User[]) => {
      // Sin map, no se devuelven objetos User, si no objetos que parecen un User
      // Lo cierto es que todo esto, lo estoy haciendo sólo por poder usar métodos de User, toString()
      // Creo que no lo haría en producción
      return users.map((user: User) => {
        return User.CreateFromUser(user);        
      });
    });
  }
}