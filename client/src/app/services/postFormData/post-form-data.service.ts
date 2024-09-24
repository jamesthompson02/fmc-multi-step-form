import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostFormDataService {
  constructor(private http: HttpClient) {}

  signUpCustomer(formData: any) {
    return this.http.post('http://localhost:5000/api/signup', formData);
    // .subscribe((response) => console.log(response));
  }
}
