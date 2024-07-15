import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ShippingForm } from '../../product/components/checkout/model/ShippingForm.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = `${environment.baseAPIURL}commandes`; // API base URL

  constructor(private http: HttpClient) { }

  createShipping(shippingData: ShippingForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, shippingData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError('Error occurred while creating shipping information.');
        })
      );
  }

  getShipping(id: number): Observable<ShippingForm> {
    return this.http.get<ShippingForm>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllShipping(): Observable<ShippingForm[]> {
    return this.http.get<ShippingForm[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateShipping(id: number, shippingData: ShippingForm): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, shippingData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteShipping(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
