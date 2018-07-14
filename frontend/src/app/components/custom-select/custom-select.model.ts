export class CustomSelect {
  id: number;
  name: string;
  selected: boolean;
  parent?: number;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.selected = false;

    this.parent = data.parent ? data.parent : false;
  }
}

export class CustomSelectCategory {
  id: number;
  name: string;
  childCount?: number;

  constructor(item, initialData) {
    this.id = item.id;
    this.name = item.name;
    this.childCount = initialData.filter(el => {
      return el.category === item.id;
    }).length;
  }
}
