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

  /**
   * Retrieve information about all roads from the API, including associated roadworks, webcams, parking lorries,
   * warnings, closures, and electric charging stations.
   * @returns {Observable<Road[]>} Observable emitting an array of Road objects representing the information about each road.
   */
  getRoads(): Observable<Road[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<{ roads: string[] }>(url).pipe(
      switchMap((response) => {
        if (response && response.roads) {
          const roadObservables: Observable<Road>[] = response.roads.map((roadId) => {
            if (roadId === 'A1/A59') {
              // Due to the format of the road, the request could not be completed for this specific highway.
              return of(new Road(roadId, [], [], [], [], [], [])); // Return empty arrays for "A1/A59" highway.
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

  /**
   * Retrieve roadworks associated with a specific road ID from the API.
   * @param {string} roadId - The ID of the road for which roadworks are to be retrieved.
   * @returns {Observable<Roadwork[]>} Observable emitting an array of Roadwork objects associated with the specified road ID.
   */
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

  /**
   * Retrieve webcams associated with a specific road ID from the API.
   * @param {string} roadId - The ID of the road for which webcams are to be retrieved.
   * @returns {Observable<Webcam[]>} Observable emitting an array of Webcam objects associated with the specified road ID.
   */
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

  /**
   * Retrieve parking lorries associated with a specific road ID from the API.
   * @param {string} roadId - The ID of the road for which parking lorries are to be retrieved.
   * @returns {Observable<ParkingLorry[]>} Observable emitting an array of ParkingLorry objects associated with the specified road ID.
   */
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

  /**
   * Retrieve warnings associated with a specific road ID from the API.
   * @param {string} roadId - The ID of the road for which warnings are to be retrieved.
   * @returns {Observable<Warning[]>} Observable emitting an array of Warning objects associated with the specified road ID.
   */
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

  /**
   * Retrieve closures associated with a specific road ID from the API.
   * @param {string} roadId - The ID of the road for which closures are to be retrieved.
   * @returns {Observable<Closure[]>} Observable emitting an array of Closure objects associated with the specified road ID.
   */
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

  /**
   * Retrieve electric charging stations associated with a specific road ID from the API.
   *
   * @param {string} roadId - The ID of the road for which electric charging stations are to be retrieved.
   * @returns {Observable<ElectricChargingStation[]>} Observable emitting an array of ElectricChargingStation objects associated with the specified road ID.
   */
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
