export interface Status {
    code: number;
    message: string;
    data: []
}


export interface IAlert {
    id: number;
    type: string;
    message: string;
  }


  export interface Alert {
      type: string;
      title: string;
      body: string;
      footer: string;
  }