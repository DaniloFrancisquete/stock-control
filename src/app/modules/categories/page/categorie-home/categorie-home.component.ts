import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { DeleteCategoryAction } from 'src/app/models/enums/categories/DeleteCategoryAction';
import { GetCategoriesResponse } from 'src/app/models/user/interfaces/categories/response/GetCategoriesResponse';
import { EnventAction } from 'src/app/models/user/interfaces/products/event/EventAction';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CategoriesFormComponent } from '../../components/categories-form/categories-form.component';

@Component({
  selector: 'app-categorie-home',
  templateUrl: './categorie-home.component.html',
  styleUrls: []
})

export class CategorieHomeComponent implements OnInit, OnDestroy{

  private readonly destroy$: Subject<void> = new Subject();
  public categoriesDatas: Array<GetCategoriesResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService : DialogService,
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories() {
    this.categoriesService
    .getAllCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.categoriesDatas = response;
        }
      }, error: (err) => {
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail:'Erro ao buscar categorias!',
          life: 3000,
        });
        this.router.navigate(['/dashboard']);
      }
  })
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (event) {
      this.ConfirmationService.confirm({
        message:`Confirma a exclusão da categoria: ${event?.categoryName}`,
        header:`Confirmação de exclusão`,
        icon:'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',
        accept:() => this.deleteCategory(event?.category_id),
      });
    }
  }

  deleteCategory(category_id: string): void {
    if (category_id) {
      this.categoriesService
        .deleteCategory({ category_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria removida com sucesso!',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
            this.getAllCategories();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover categoria!',
              life: 3000,
            });
          },
        });
    }
  }

  handleCategoryAction(event: EnventAction): void {
    if (event) {
      this.ref = this.dialogService.open(CategoriesFormComponent, {
        header: event?.action,
        width:'70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex:1000,
        maximizable: true,
        data: {
          event: event
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllCategories(),
      });
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
