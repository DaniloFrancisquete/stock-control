import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieHomeComponent } from './page/categorie-home/categorie-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CATEGORIES_ROUTES } from './categories.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import {  InputSwitchModule } from 'primeng/inputswitch';
import {  InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import {  InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {  DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { ConfirmationService } from 'primeng/api';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';



@NgModule({
  declarations: [
    CategorieHomeComponent,
    CategoriesTableComponent,
    CategoriesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CATEGORIES_ROUTES),
    SharedModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputTextModule,
    InputSwitchModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule
  ],

  providers: [DialogService, ConfirmDialogModule, ConfirmationService]
})
export class CategoriesModule { }
