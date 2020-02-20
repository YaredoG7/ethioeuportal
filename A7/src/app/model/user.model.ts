export class User {
    constructor(
      public firstname: string,
      public lastname: string,
      public address: {
        city: string;
        country: string;
        postcode: string;
        house_num?: string;
      },
      public company: string,
      public vit_id: string,
      public role: string,
      public email: string,
      public password: string,
      public phone: string,
      public metadata: {
       
      },
      public payment: string,
      public has_paid?: boolean,
      public access_code?: number,
      public can_pay_eur?: boolean,
      public education_level?: string,
      public first_payment?: string,
      public points?: number,
      public star?: number,
      public certificate?: string,
      public app_status?: string,
      public preferred_cntry?: string,

    ) {}
  }
  