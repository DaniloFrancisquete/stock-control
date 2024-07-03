import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environments';
import { GetCategoriesResponse } from 'src/app/models/user/interfaces/categories/response/GetCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOtions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };


  constructor(private http: HttpClient, private cookie: CookieService) { }

  createNewCategory(requestDatas: {
    name:string;
  }): Observable<Array<GetCategoriesResponse>> {
    return this.http.post<Array<GetCategoriesResponse>> (
      `${this.API_URL}/category`,
      requestDatas,
      this.httpOtions
    )
    }

  getAllCategories(): Observable<Array<GetCategoriesResponse>> {
    return this.http.get<Array<GetCategoriesResponse>>(
      `${this.API_URL}/categories`,
      this.httpOtions
    );
  }

  deleteCategory(requestDatas: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOtions,
      params: {
        category_id: requestDatas?.category_id,
      },
    });
  }
}
