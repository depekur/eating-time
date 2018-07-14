import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FavoriteRecipeService } from "../../shared/services/favorite-recipe.service";

@Component({
  selector: 'favorite-recipe',
  templateUrl: './favorite-recipe.component.html',
  styleUrls: ['./favorite-recipe.component.scss']
})
export class FavoriteRecipeComponent implements OnInit {
  @Input() recipeId: number;
  @Input() favorite: boolean = false;


  @Output('change') changeEvent = new EventEmitter();

  constructor(private favoriteService: FavoriteRecipeService) { }

  ngOnInit() {
  }

  toggleFavorite() {
    this.favorite = !this.favorite;

    const params = { recipeId: this.recipeId };

    if (this.favorite) {
      this.addToFavorite(params);
    } else {
      this.deleteFromFavorites(params);
    }
  }

  addToFavorite(params) {
    this.favoriteService.addToFavorite(params).subscribe(
      (data) => {
        this.changeEvent.emit(this.favorite);
      },
      (error) => {
        //todo error logging
        console.warn(error);
      }
    );
  }

  deleteFromFavorites(params) {
    this.favoriteService.deleteFromFavorites(params).subscribe(
      (data) => {
        this.changeEvent.emit(this.favorite);
      },
      (error) => {
        //todo error logging
        console.warn(error);
      }
    );
  }
}
