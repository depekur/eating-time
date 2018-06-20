export class CustomSelect {
  id: number;
  name: string;
  selected: boolean;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.selected = false;
  }
}

export class CustomCategory extends CustomSelect {
  isHaveParent: boolean;
  parentId: number;

  constructor(data) {
    super(data);

    this.id = data.category_id;
    this.name = data.category_name;
    this.isHaveParent = data.is_have_parent;
    this.parentId = data.parent_id;
  }
}

export class CustomCountry extends CustomSelect {

  constructor(data) {
    super(data);

    this.id = data.country_id;
  }
}

export class CustomDestination extends CustomSelect {

  constructor(data) {
    super(data);

    this.id = data.destination_id;
  }
}
