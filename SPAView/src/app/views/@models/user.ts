export interface User {
  id: number;
  title: string;
  username: string;
  password: string;
  gender: string;
  phone: string;
  email: string;
  roleType: string;
}

enum RoleType {
  Farshboom = 1,
  Provider = 2,
  Customer = 3,
}
enum Gender {
  Male = 1,
  Female = 2,
}
