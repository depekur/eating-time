export class User {
  id: number;
  name: string;
  email: string;

  constructor(data) {
    this.id = data.user_id;
    this.name = data.name;
    this.email = data.email;
  }
}
