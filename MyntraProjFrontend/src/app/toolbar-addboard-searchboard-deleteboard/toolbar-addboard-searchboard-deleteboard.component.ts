import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { APIServiceService } from '../service-file/api-service.service';

@Component({
  selector: 'app-toolbar-addboard-searchboard-deleteboard',
  templateUrl: './toolbar-addboard-searchboard-deleteboard.component.html',
  styleUrl: './toolbar-addboard-searchboard-deleteboard.component.css',
})
export class ToolbarAddboardSearchboardDeleteboardComponent {
  items: MenuItem[] | undefined;
  visible: boolean = false;
  boardName: string = '';
  boards: any[] = [];

  constructor(private _apiService: APIServiceService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }

  showDialog() {
    this.visible = true;
  }

  addBoard() {
    if (this.boardName) {
      this._apiService.addBoard(this.boardName).subscribe(
        (response) => {
          console.log('Board added successfully', response);
        },
        (error) => {
          console.error('Error adding board', error);
        }
      );
    } else {
      console.error('Board name is required.');
    }
  }

  getBoards() {
    this._apiService.getBoards().subscribe({
      next: (data: any) => {
        this.boards = data;
        this.boards = this.boards.map((board) => ({
          boardName: board.boardName,
        }));
      },
      error: (error: any) => {
        console.error('Error fetching boards', error);
      },
    });
  }
}
