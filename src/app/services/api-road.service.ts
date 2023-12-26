import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../config/environment';
import { Road } from '../models/road.model';

@Injectable()
export class ApiRoadService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getRoads(): Observable<Road[]> {
    return this.http.get<{ roads: string[] }>(`${this.baseUrl}`).pipe(
      map((response) => {
        if (response && response.roads) {
          return response.roads.map((roadId) => new Road(roadId));
        } else {
          return [];
        }
      })
    );
  }
}
