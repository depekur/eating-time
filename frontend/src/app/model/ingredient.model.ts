export class Ingredient {
  id: number;
  name: string;

  category?: string;
  calories?: number;
  fat?: string;
  proteins?: string;
  carbs?: string;

  count?: string;
  measure?: string;
  isCustom?: boolean;

  constructor(data?: any) {
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : null;

    this.category = data.category ? data.category : null;
    this.calories = data.calories ? data.calories : null;
    this.fat = data.fat ? data.fat : null;
    this.proteins = data.proteins ? data.proteins : null;
    this.carbs = data.carbs ? data.carbs : null;

    this.count = data.count ? data.count : null;
    this.measure = data.measure ? data.measure : null;


  }
}

export const MEASURE = {

};
