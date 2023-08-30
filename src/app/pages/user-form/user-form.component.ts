import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    user?: User;

    create: boolean = true;

    form = new FormGroup({
        name: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        document: new FormControl(null, Validators.required),
        registry: new FormControl(),
        birthday: new FormControl(),
        phone: new FormControl(),
        active: new FormControl(),
    });

    get name() { return this.form.get('name'); }
    get document() { return this.form.get('document'); }

    constructor(private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }

    ngOnInit(): void {
        const id = this.activatedRoute?.snapshot?.queryParams['id'];
        if (id) {
            this.create = false;
            this.userService.getUserById(id).subscribe(res => {
                this.user = res;
            });
        }

        if (!id) {
            this.user = {
                name: '',
                birthday: '',
                document: '',
                phone: '',
                registry: '',
                type: '',
                active: true,
            }
        }
    }

    onSubmit() {
        if (this.create) {
            this.userService.createUser(this.user!).subscribe(res => {
                this.user = res;
                this.openSnackBar('User created succesfuly', 'Ok!');
            });
        }

        if (!this.create) {
            this.userService.updateUser(this.user!).subscribe(res => {
                this.user = res;
                this.openSnackBar('User updated succesfuly', 'Ok!');
            });
        }
    }

    back() {
        this.router.navigate(['/']);
    }
}
