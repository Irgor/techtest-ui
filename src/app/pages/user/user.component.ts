import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User, UserFilter } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    users: User[] = [];
    columns: string[] = [
        'id',
        'name',
        'type',
        'document',
        'registry',
        'birthday',
        'phone',
        'active',
        'options',
    ];

    form = new FormGroup({
        name: new FormControl(''),
        active: new FormControl('all')
    });

    constructor(private userService: UserService, private router: Router) { };

    ngOnInit() {
        this.getUsers();
    }

    addNew() {
        this.router.navigate(['form'])
    }

    onSubmit() {
        let { name, active } = this.form.getRawValue();
        let activeFilter = active !== 'all' ? active : null;

        this.getUsers({ name, active: activeFilter });
    }

    getUsers(userFilter?: UserFilter) {
        this.userService.getUsers(userFilter).subscribe(res => {
            this.users = res;
        })
    }

    

}
