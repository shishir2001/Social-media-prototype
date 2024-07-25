import { Component } from '@angular/core';
import {
  APIServiceService,
  Board,
  BoardProducts,
  Products,
} from '../service-file/api-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css',
})
export class ViewProductsComponent {
  products: Products[] = [];
  boards: Board[] = [];
  cities: any[] = [];
  checked: boolean = false;
  // cities: City[] | undefined;

  // selectedBoard: Board | undefined;
  selectedBoard: Board | null = null;
  selectedCategories: any[] = [];
  message: string = '';
  boardproducts: BoardProducts[] = [];
  private mainapiUrl = 'http://localhost:7245';

  constructor(private _apiService: APIServiceService, private router: Router) {}

  ngOnInit() {
    this._apiService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
    });
    this._apiService.getBoards().subscribe((data: Board[]) => {
      this.boards = data;
    });
    this._apiService.getBoards().subscribe((data: Board[]) => {
      this.boards = data;
      this.cities = this.boards.map((board) => ({
        label: board.boardName,
        value: board.boardID,
      }));
    });
  }

  sessionboardID: any;
  onBoardChange(event: any) {
    const selectedBoard = event.value;
    this.sessionboardID = selectedBoard.boardID;
  }

  onSubmit() {
    const boardID = this.sessionboardID;
    const selectedIDs = this.products
      .filter((product) => product.checked)
      .map((product) => product.itemID)
      .toString();

    this._apiService.addProductsToBoard(boardID, selectedIDs).subscribe(
      (response) => {
        this.message = response;
      },
      (error) => {
        Swal.fire({
          title: 'Products added!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.message = 'Error adding products to board';
        console.error('Error:', error);
      }
    );

    console.log('boardID: ', boardID);
    console.log('Selected Item IDs:', selectedIDs);
  }
}
