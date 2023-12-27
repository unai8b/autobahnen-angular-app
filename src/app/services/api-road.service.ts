import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';
import { environment } from '../config/environment';
import { Road } from '../models/road.model';
import { Roadwork } from '../models/roadwork.model';
import { endpoints } from '../config/endpoints';
import { Webcam } from '../models/webcam.model';
import { ParkingLorry } from '../models/parking-lorry.model';
import { Warning } from '../models/warning.model';
import { Closure } from '../models/closure.model';
import { ElectricChargingStation } from '../models/electric-charging-station.model';

@Injectable()
export class ApiRoadService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getRoads(): Observable<Road[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<{ roads: string[] }>(url).pipe(
      switchMap((response) => {
        if (response && response.roads) {
          const roadObservables: Observable<Road>[] = response.roads.map((roadId) => {
            if (roadId === 'A1/A59') {
              return of(new Road(roadId, [], [], [], [], [], [])); // Return empty arrays for "A1/A59" highway
            } else {
              const roadworksObservable = this.getRoadworksByRoadId(roadId);
              const webcamsObservable = this.getWebcamsByRoadId(roadId);
              const parkingLorriesObservable = this.getParkingLorriesByRoadId(roadId);
              const warningsObservable = this.getWarningsByRoadId(roadId);
              const closuresObservable = this.getClosuresByRoadId(roadId);
              const electricChargingStationsObservable = this.getElectricChargingStationsByRoadId(roadId);

              return forkJoin([
                roadworksObservable,
                webcamsObservable,
                parkingLorriesObservable,
                warningsObservable,
                closuresObservable,
                electricChargingStationsObservable
              ]).pipe(
                map(([
                  roadworks,
                  webcams,
                  parkingLorries,
                  warnings,
                  closures,
                  electricChargingStations
                ]) => new Road(
                  roadId,
                  roadworks,
                  webcams,
                  parkingLorries,
                  warnings,
                  closures,
                  electricChargingStations
                ))
              );
            }
          });
          return forkJoin(roadObservables);
        } else {
          return of([]);
        }
      })
    );
  }

  getRoadworksByRoadId(roadId: string): Observable<Roadwork[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getRoadworksByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{roadworks: Roadwork[] }>(url).pipe(
      map((response) => {
        if (response && response.roadworks) {
          return response.roadworks.map((roadwork) => new Roadwork(roadwork.title));
        } else {
          return [];
        }
      })
    );
  }

  getWebcamsByRoadId(roadId: string): Observable<Webcam[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getWebcamsByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{webcams: Webcam[] }>(url).pipe(
      map((response) => {
        if (response && response.webcams) {
          return response.webcams.map((webcams) => new Webcam(webcams.title));
        } else {
          return [];
        }
      })
    );
  }

  getParkingLorriesByRoadId(roadId: string): Observable<ParkingLorry[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getParkingLorriesByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{parking_lorry: ParkingLorry[] }>(url).pipe(
      map((response) => {
        if (response && response.parking_lorry) {
          return response.parking_lorry.map((parking_lorry) => new ParkingLorry(parking_lorry.title));
        } else {
          return [];
        }
      })
    );
  }

  getWarningsByRoadId(roadId: string): Observable<Warning[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getWarningsByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{warning: Warning[] }>(url).pipe(
      map((response) => {
        if (response && response.warning) {
          return response.warning.map((warning) => new Warning(warning.title));
        } else {
          return [];
        }
      })
    );
  }

  getClosuresByRoadId(roadId: string): Observable<Closure[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getClosuresByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{closure: Closure[] }>(url).pipe(
      map((response) => {
        if (response && response.closure) {
          return response.closure.map((closure) => new Closure(closure.title));
        } else {
          return [];
        }
      })
    );
  }

  getElectricChargingStationsByRoadId(roadId: string): Observable<ElectricChargingStation[]> {
    const encodedRoadId = encodeURIComponent(roadId);
    var url = `${this.baseUrl}${endpoints.getElectricChargingStationsByRoadId.replace(':roadId', encodedRoadId)}`;
    return this.http.get<{electric_charging_station: ElectricChargingStation[] }>(url).pipe(
      map((response) => {
        if (response && response.electric_charging_station) {
          return response.electric_charging_station.map((electric_charging_station) =>
            new ElectricChargingStation(electric_charging_station.title));
        } else {
          return [];
        }
      })
    );
  }
}
