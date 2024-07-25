import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Board {
  boardID: number;
  boardName: string;
  isEdit: number;
  likes: number;
}

export interface Products {
  itemID: number;
  itemName: string;
  itemType: string;
  itemData: string;
  imglink: string;
  checked: boolean;
}

export interface BoardProducts {
  itemID: number;
  itemName: string;
  itemType: string;
  itemData: string;
  checked: boolean;
}

export interface BoardById {
  boardID: number;
  boardName: string;
  isEdit: number;
  likes: number;
}

@Injectable({
  providedIn: 'root',
})
export class APIServiceService {
  private mainapiUrl = 'http://localhost:7245';
  private apiUrl = 'http://localhost:7245/Home';
  private apiUrlOne = 'http://localhost:7245/Home/GetBoards';
  private apiUrlTwo = 'http://localhost:7245/Home/GetProducts';
  private apiUrlTHree = 'http://localhost:7245/Home/UpdateBoardName';

  constructor(private http: HttpClient) {}

  addBoard(boardName: string): Observable<any> {
    const url = `${this.apiUrl}/AddBoard`;
    const params = { boardName };

    return this.http.post(url, null, { params });
  }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrlOne);
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrlTwo);
  }

  addProductsToBoard(boardID: number, itemIDs: string): Observable<any> {
    const url = `${this.mainapiUrl}/Home/AddProductsToBoard`;
    const params = { boardID: boardID.toString(), itemIDs: itemIDs };
    return this.http.post<any>(url, null, { params });
  }

  deleteProductsToBoard(boardID: number, itemIDs: string): Observable<any> {
    const url = `${this.mainapiUrl}/Home/DeleteProductsFromBoard`;
    const params = { boardID: boardID.toString(), itemIDs: itemIDs };
    return this.http.post<any>(url, null, { params });
  }

  getProductsForBoard(boardID: number): Observable<Products[]> {
    const url = `${this.mainapiUrl}/Home/GetProductsForBoard/${boardID}`;
    return this.http.get<Products[]>(url);
  }

  updateBoardName(boardID: number, newBoardName: string): Observable<any> {
    const params = new HttpParams()
      .set('boardID', boardID.toString())
      .set('newBoardName', newBoardName);

    return this.http.put(this.apiUrlTHree, null, { params });
  }

  deleteBoard(boardID: number): Observable<any> {
    const params = new HttpParams().set('boardID', boardID.toString());
    return this.http.delete(`${this.apiUrl}/DeleteBoard`, { params });
  }

  getBoardById(boardID: number): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/GetBoardById/${boardID}`);
  }
}
