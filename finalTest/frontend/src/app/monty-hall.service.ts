import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MontyHallService {
  private apiUrl = 'https://localhost:7088/api/Monty_Hall/RunSimulation';

  constructor(private http: HttpClient) { }

  runMontyHallSimulations(simulations: number, changeDoor: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/monty-hall`, {
      params: { simulations: simulations.toString(), changeDoor: changeDoor.toString() }
    });
  }


}
