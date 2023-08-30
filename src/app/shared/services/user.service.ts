import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User, UserFilter } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // API_URL = 'https://techtest-api.onrender.com/api/';
    API_URL = 'http://localhost:8080/api/';

    constructor(public http: HttpClient) { }

    getUsers(filter?: UserFilter): Observable<any> {
        let params = '?'

        if (filter?.name) {
            params += '&name=' + filter.name;
        }

        if (filter?.active) {
            params += '&active=' + filter.active
        }

        return this.http.get(this.API_URL + 'users' + params);
    }

    getUserById(id: string): Observable<any> {
        return this.http.get(this.API_URL + 'users/' + id);
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.API_URL + 'users/' + user.id, user);
    }

    createUser(user: User): Observable<any> {
        return this.http.post(this.API_URL + 'users', user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(this.API_URL + 'users/' + id);
    }


}
