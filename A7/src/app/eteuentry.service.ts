import { Injectable } from "@angular/core";
import { User } from "./model/user.model";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Status } from "./model/status.model";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
import { EUCountry, Message } from './model/common.model';
import { ToasterService, BodyOutputType, Toast } from 'angular2-toaster';



@Injectable({
  providedIn: 'root'
})
export class EteuentryService {

  public loggedInUser: User;
  
   private baseUri = 'https://app.ethioportal.eu:2626/api/v1';
   // private baseUri = 'http://localhost:3000/api/v1';
   private ApiUri = 'https://restcountries.eu/rest/v2/alpha/';
   private euNationApi = "https://restcountries.eu/rest/v2/region/europe";


  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private tstr: ToasterService) { }


  public getCountryByCode(code: string): Observable<EUCountry>{
    return this.http.get<EUCountry>(this.ApiUri + code)
  }

  public getApplicants() {

  }

public createEucountry(country: EUCountry): Observable<Status>{
  return this.http.post<Status>(this.baseUri+'/eu_countries/eucountry', {country}, {withCredentials: true})
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! Server came back with error";
    }
))
}


public downloadDocs(userId): Observable<Status>{
  return this.http.get<Status>(this.baseUri + `/files/zip/${userId}`)
}

public getEUCountries(): Observable<EUCountry[]> {
  return this.http.get<EUCountry[]>(this.euNationApi);
}
public getEucountries(): Observable<EUCountry[]> {
  return this.http.get<EUCountry[]>(
    this.baseUri+'/eu_countries/eucountry',
   
  );
} 


public sendMessage(msg, userId): Observable<Status> {
  return this.http.put<Status>(this.baseUri+`/auth/message/${userId}`, {msg}, {withCredentials: true})
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! Server came back with error";
    }
))
}

public getMessage(userId): Observable<any>{
  return this.http.get<any>(this.baseUri + `/auth/message/${userId}`, {withCredentials: true} )
}


public updateEUCountry(code: string): Observable<Status> {
  return this.http.get<Status>(
    this.baseUri+'/eu_countries/eucountry/' + code,
   
  );
}



public createUser (data): Observable<Status> {
  return this.http.post<Status>(this.baseUri+'/auth/register', data, {withCredentials: true})
              .pipe(map(
                res => {
                  return res;
                }, err => {
                  return "Opps! Server came back with error";
                }
            ))
}

public getUser(et_eu_id): Observable<User>{
  return this.http.get<User>(
    this.baseUri+`/auth/user/${et_eu_id}` ,
   
  );
}

public updateUser(userId, data): Observable<Status> {
  return this.http.put<Status>(this.baseUri+`/auth/user/${userId}`, {data} , {withCredentials: true})
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! User not updated, Server came back with error";
    }
  ))
}

public getUsers(): Observable<User[]>{
  return this.http.get<User[]>(
    this.baseUri+`/auth/users` ,
   
  );
}

  public uploadDocument(doucument): Observable<Status> {
    return this.http.post<Status>(this.baseUri+'/files/document', {doucument})
      .pipe(map(
        res => {
          return res;
        }, err => {
          return "Opps! Document not registered, Server came back with error";
        }
      ))
  }
/*

  addFiles(images: File) {
    var arr  = []
    var formData = new FormData();

    arr.push(images);
  
    arr[0].forEach((item, i) => {
      formData.append('docs', arr[0][i]);
    //  console.log(item)
    })

  //  formData.append('docs', images, user_id)
    console.log(arr)

    return this.http.post('http://localhost:3000/api/v1/files/applciant_document/TEST', {arr}, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

*/
  
  public getDocument(user): Observable<Status> {
    return this.http.get<Status>(
     // documents
      this.baseUri+`/files/documents/${user}` ,
   // this.baseUri+`/files/documents` ,
     
    );
  }

  public login (data): Observable<any> {
    return this.http.post<any>(this.baseUri+'/auth/login', data, {withCredentials: true}).pipe(map(res => {
      this.userLogged = res.data;
  
     let user = {
        data: res.data,
        loggedIn: Date.now()
      }
      // this.cookieService.set('vit_user', JSON.stringify(res.data) )
      sessionStorage.setItem('ETEUPORTALUSER', JSON.stringify(user));
       this.cookieService.set('eteu_portal_user', res.token);
      // this.isAdmin(res.data.role)
      return res;
     }, err => {
       console.log(err)
     }));
  }

set userLogged(data) {this.loggedInUser = data}
get loggedUser(): any { return this.loggedInUser}


sendAccessCode(email): Observable<Status> {
//  console.log(email)
  return this.http.post<Status>(this.baseUri+'/auth/get_access_code', {email}, {withCredentials: true})
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! Server came back with error";
    }
  ))
}


verifyAccessCode(access_code, password): Observable<Status>{
  return this.http.post<Status>(this.baseUri+`/auth/verify_password/${access_code}`, {password}, {withCredentials: true})
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! Server came back with error";
    }
  ))
}



public showAlert(type, msg): void{

  var toast : Toast = {
    type: 'success',
    body: `<div class="alert alert-app-level alert-${type}" style="margin-bottom:24px; padding: 5px; font-size: 14px;" role="alert">
    <div class="alert-items">
        <div class="alert-item static">
            <div class="alert-icon-wrapper">
            <clr-icon shape="bell" size="16"></clr-icon>
            </div>
            <div class="alert-text">
                ${msg}
            </div>
            
        </div>
    </div>`,
    bodyOutputType: BodyOutputType.TrustedHtml
};


this.tstr.pop(toast)
}

/******Delete functions******/
public deleteEucountry (alphaCode) : Observable<Status> {
    return this.http.delete<Status>(this.baseUri + `/eu_countries/eucountry/${alphaCode}`)
    .pipe(map(
      res => {
        return res;
      }, err => {
        return "Opps! Server came back with error";
      }
    ))
}


public deleteMember (userId) : Observable<Status> {
  return this.http.delete<Status>(this.baseUri + `/auth/user/${userId}`)
  .pipe(map(
    res => {
      return res;
    }, err => {
      return "Opps! Server came back with error";
    }
  ))
}





}
