import { EditCategoryAction } from './../../../../models/user/interfaces/categories/event/EditCategoryAction';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: []
})

export class CategoriesFormComponent implements OnInit, OnDestroy {

private readonly destroy$: Subject<void> = new Subject();

public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

public categoryAction!: {event: EditCategoryAction};
public categoryForm = this.FormBuilder.group({
  name: ['',Validators.required],
})

  constructor(
    public ref: DynamicDialogConfig,
    private  FormBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService

  ) {}

  ngOnInit(): void {

  }

handleSubmitAddCategory(): void {
  if(this.categoryForm?.value && this.categoryForm?.valid) {
    const requestCreateCategory: {name: string} = {
      name: this.categoryForm.value.name as string,
    };


this.categoriesService.createNewCategory(requestCreateCategory)
.pipe(takeUntil(this.destroy$))
.subscribe({
  next: (response) => {
    if (response) {
      this.categoryForm.reset();
      this.messageService.add ({
        severity:'sucess',
        summary:'Sucesso',
        detail: 'Categotia criada com sucesso',
        life:3000,
      })
    }
  },
  error:(err) => {
    console.log(err);
    this.categoryForm.reset();
    this.messageService.add({
      severity:'error',
      summary:'Error',
      detail: 'Error ao criar categoria!',
      life:3000,
    })
  }
})

  }
}

  ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();
  }

}