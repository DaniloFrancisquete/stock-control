import { GetCategoriesResponse } from 'src/app/models/user/interfaces/categories/response/GetCategoriesResponse';
import { CategorieHomeComponent } from './../../page/categorie-home/categorie-home.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
@Input() public categories: Array<GetCategoriesResponse> = [];

public categorySelected!: GetCategoriesResponse;
}
