import { TestBed, inject } from '@angular/core/testing';

import { FavoriteRecipeService } from './favorite-recipe.service';

describe('FavoriteRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteRecipeService]
    });
  });

  it('should be created', inject([FavoriteRecipeService], (service: FavoriteRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
