import {Component, Input, OnInit, OnDestroy, forwardRef, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomSelect, CustomSelectCategory} from "./custom-select.model";

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() initialData: any;
  @Input() title: string|boolean = false;
  @Input() multiple: boolean = true;
  @Input() showSelected: boolean = false;

  @Input() isCategories: boolean|any = false;
  @Input() isCategoryCount: boolean|any = false;
  @Input() categoriesList: boolean|any = false;

  @Input() isSearch: boolean|any = false;
  @Input() searchPlaceholder: boolean|string = false;
  @Input() searchAPIUrl: boolean|any = false;

  @Input() disabled: boolean = false;
  @Input() hidden: boolean = true;
  @Input() positioned: boolean = false;
  @Input() height: number = 250;


  @Output('change') changeEvent = new EventEmitter();

  data: CustomSelect[];
  activeCategoryId: number = 0;
  categories: CustomSelectCategory[];

  defaultSearchPlaceholder: string = 'Поиск...';
  query: string;


  constructor() {}

  ngOnInit() {
    this.data = this.initialData.map((item) => new CustomSelect(item));

    if (this.isCategories) {
      this.categories = this.getCategories();
    }
  }

  ngOnDestroy() {
    this.initialData = null;
    this.data = null;
    this.categoriesList = null;
  }

  search() {
    this.data = this.data.filter(item => {
      return item.name.toLowerCase().includes(this.query);
    })
  }

  toggleSelected(item): void {
    if (this.isDisabled() && !item.selected) return;

    item.selected = !item.selected;

    this.initialData.forEach(initialItem => {
      if (initialItem.id === item.id) {
        initialItem.selected = item.selected;
      }
    });

    this.propagateTouch();
    this.writeValue(this.selected, false);
  }

  setDataByCategory(): void {
    if (this.activeCategoryId === 0) {
      this.data = this.initialData;
    } else {
      this.data = this.initialData.filter(item => item.category === this.activeCategoryId);
    }

    // if (this.isSearch) {
    //   this.search();
    // }
  }

  getCategories():CustomSelectCategory[] {
    let categories = [];

    if (this.categoriesList) {
      categories = this.categoriesList.map(item => {
        return new CustomSelectCategory(item, this.initialData);
      });
    } else {
      this.initialData.forEach(item => {
        if (!item.category) {
          categories.push(new CustomSelectCategory(item, this.initialData));
        }
      });
    }

    return categories;
  }

  get selected():CustomSelect[] {
    return this.initialData.filter(item => item.selected);
  }

  isDisabled(): boolean|number {
    return !this.multiple && this.selected.length;
  }

  writeValue(selected: any, update: boolean = true) {
    if (update && selected) {
      this.initialData.forEach(item => {
        item.selected = false;

        selected.forEach(selectedItem => {
          if (item.id === selectedItem.id) {
            item.selected = true;
          }
        });
      });

      this.setDataByCategory();
    }

    this.onChange(selected);
    this.changeEvent.emit(selected);
  }


  // searchIngredient(value, index) {
  //   this.searchIngredients[index] = null;
  //   this.isSearchBgVisible = false;
  //
  //   if (value == '' && value.length < 3) { return; }
  //
  //   clearTimeout(this.searchIngredientTimeout);
  //
  //   this.searchIngredientTimeout = setTimeout(() => {
  //     this.ingredientService.searchIngredient(value).subscribe(
  //       ing => {
  //         this.searchIngredients[index] = ing.length ? ing : null;
  //
  //         if (this.searchIngredients[index]) {
  //           this.isSearchBgVisible = true;
  //         }
  //
  //         //console.log(this.searchIngredients);
  //       },
  //       error => {
  //         console.warn(error);
  //       }
  //     );
  //   }, this.secondsBeforeSearch);
  // }
  //
  // selectIngFromSearch(ingredient, index) {
  //   this.createRecipeForm.get('ingredients').controls[index].controls.name.setValue(ingredient.name);
  //   this.createRecipeForm.get('ingredients').controls[index].controls.id.setValue(ingredient.id);
  //   this.closeSearch();
  // }
  //
  // closeSearch() {
  //   this.searchIngredients = [];
  //   this.isSearchBgVisible = false;
  // }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  onChange(_: any): void {}

  propagateTouch(): void {}
}
