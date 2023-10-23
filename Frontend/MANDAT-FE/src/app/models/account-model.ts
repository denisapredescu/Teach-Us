export interface AccountModel {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
  role: string;
  bio: string;
  educationalInstitution: string;
  city: string;
  county: string;
  addressInfo: string;
}

export interface AccountFormModel{
  userEmail: string;
  model: AccountModel;
}