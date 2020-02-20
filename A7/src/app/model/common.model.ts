import { User } from './user.model';


export interface Message {
    to: string,
    from: string,
    message: string,
    subject?: string,
    metadata?: any
}
export interface LeaderBoard {
    userId: string;
    name: string;
    from: string;
    points: number;
    stars: number;

}

export interface DocumentUpload {
    userId: string;
    transcript_1: string;
    transcript_2: string;
    bsc: string;
    msc: string;
    recom_1: string;
    recom_2?: string;
    mtv_letter?: string;
    language_cert?: string;
    passport?: string;
    certificate_1?: string;
    certificate_2?: string;
}

export interface AppFeePayment {
    userId: string;
    num_of_uni: boolean;
    mtv_letter: boolean;
    total: string;
    bank: string;
    receipt?: string;
}

export interface Cost {
    tuition: string;
    flight: string;
    house: string;
    app: string;
    food: string;
    extra: string;
}

 export class EUCountry {
        name: string;
        code: string;
        capital: string;
        aval_schlr: string;
        aval_uni: string;
        borders?: [];
        currency?: string;
        flag?: string;
        native?: string; // nativeName
        long_name?: string;
        cost?: Cost;
        comment?: any;
        
    
} 

export interface Applicant {
    user: string,
    documentId: DocumentUpload,
    payment: AppFeePayment,
    cost: Cost,
    fav_country: string
}


export interface Course {
    uni: string,
    address: string,
    name_1: string,
    name_2: string,
    name_3: string,
    tution_1: string,
    tution_2: string,
    tution_3: string,
    comment: string,
}


export interface ItemOrder {
    name: string,
    img: string [],
    price: string,
    available: boolean,
    left: number,
    description?: string

}
