import { Component } from '@angular/core';
import {
  APIServiceService,
  Board,
  BoardById,
  BoardProducts,
  Products,
} from '../service-file/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-boards',
  templateUrl: './view-boards.component.html',
  styleUrl: './view-boards.component.css',
})
export class ViewBoardsComponent {
  boards: Board[] = [];
  products: Products[] = [];
  boardproducts: BoardProducts[] = [];
  boardsbyid: BoardById[] = [];
  message: string = '';
  cities: any[] = [];
  newBoardName: any;

  selectedBoard: BoardProducts | null = null;
  // selectedCategories: any[] = [];
  checked: boolean = false;
  visible: boolean = false;
  visiblet: boolean = false;
  visiblett: boolean = false;
  redeemvisible: boolean = false;

  selectedCategories: string = '';

  constructor(private _apiService: APIServiceService) {}

  ngOnInit() {
    this._apiService.getBoards().subscribe((data: Board[]) => {
      this.boards = data;
      console.log(this.boards);
    });
    this._apiService.getProducts().subscribe((data: Products[]) => {
      this.boardproducts = data;
    });
    this._apiService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
    });
    this._apiService.getBoards().subscribe((data: Board[]) => {
      this.boards = data;
      this.cities = this.boards.map((board) => ({
        label: board.boardName,
        value: board.boardID,
      }));
    });
  }

  onSubmit(boardID: any) {
    const selectedIDs = this.selectedCategories; // already in string format

    this._apiService.deleteProductsToBoard(boardID, selectedIDs).subscribe(
      (response) => {
        this.message = response;
      },
      (error) => {
        Swal.fire({
          title: 'Products Deleted!',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        this.message = 'Error deleeting products from board';
        console.error('Error:', error);
      }
    );
    console.log(this.selectedCategories);
  }

  getProductsForBoard(boardID: any) {
    this._apiService.getProductsForBoard(boardID).subscribe(
      (data: BoardProducts[]) => {
        this.boardproducts = data;
      },
      (error) => {
        this.message = 'Error fetching products for board';
        console.error('Error:', error);
      }
    );
  }

  updateSelectedCategories(event: any, itemID: number) {
    let selected = this.selectedCategories
      ? this.selectedCategories.split(',')
      : [];

    if (event.checked) {
      // Add itemID if checked
      selected.push(itemID.toString());
    } else {
      // Remove itemID if unchecked
      selected = selected.filter((id) => id !== itemID.toString());
    }

    this.selectedCategories = selected.join(',');
  }

  isSelected(itemID: number): boolean {
    return this.selectedCategories.split(',').includes(itemID.toString());
  }

  onSubmitupdateBoard(boardID: any) {
    if (!boardID || !this.newBoardName) {
      this.message = 'Please provide a valid Board ID and new board name.';
      return;
    }

    this._apiService.updateBoardName(boardID, this.newBoardName).subscribe(
      (response) => {
        this.message = 'Board name updated successfully.';
      },
      (error) => {
        console.error('Error:', error);
        this.message = 'Error updating board name.';
      }
    );
  }

  showDialog() {
    this.visible = true;
  }

  locked: boolean = false;
  showDialogs() {
    Swal.fire({
      title: 'Board Locked',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    this.locked = true;
  }

  members = [
    {
      name: 'Amy Elsner',
      image: 'amyelsner.png',
      email: 'amy@email.com',
      role: 'Owner',
    },
    {
      name: 'Bernardo Dominic',
      image: 'bernardodominic.png',
      email: 'bernardo@email.com',
      role: 'Editor',
    },
    {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
      email: 'ioni@email.com',
      role: 'Viewer',
    },
  ];

  deleteDialog(boardID: number) {
    this.visiblet = true;
    this.deleteBoard(boardID);
    Swal.fire({
      title: 'Board deleted successfully !',
      icon: 'warning',
      confirmButtonText: 'Ok',
    });
  }

  deleteBoard(boardID: number) {
    this._apiService.deleteBoard(boardID).subscribe(
      (response) => {
        this.message = 'Board deleted successfully.';
        console.log(response);
      },
      (error) => {
        console.error('Error:', error);
        this.message = 'Error deleting board.';
      }
    );
  }

  showRewardsDialog(boardID: any) {
    this.visiblett = true;
    // this._apiService.getBoards().subscribe((data: Board[]) => {
    //   this.boards = data;
    //   console.log(this.boards);
    // });
    this.getBoardById(boardID);
    console.log(this.boardsbyid);
  }

  getBoardById(boardID: any) {
    if (!boardID) {
      this.message = 'Please provide a valid Board ID.';
      return;
    }

    this._apiService.getBoardById(boardID).subscribe(
      (data: BoardById[]) => {
        this.boardsbyid = data;
        // this.board = response.length > 0 ? response[0] : null;
        // this.message = this.board ? null : 'Board not found.';
      },
      (error) => {
        console.error('Error:', error);
        this.message = 'Error fetching board.';
      }
    );
  }

  showRedeemDialog() {
    this.visiblett = false;
    Swal.fire({
      title: 'Coupon Claimed !',
      text: 'Check Your Myntra App',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
}
