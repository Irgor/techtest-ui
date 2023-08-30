import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  @Input('users') users!: User[];
  @Input('columns') displayedColumns!: String[];

  constructor(private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) { };


  edit(id: string) {
    this.router.navigate(['form'], { queryParams: { 'id': id } });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.userService.deleteUser(id).subscribe(res => {
          location.reload();
        });
      }
    });
  }

  remove(id: string) {
    this.openDialog(id)
  }

}
