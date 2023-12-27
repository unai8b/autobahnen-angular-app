import { Closure } from "./closure.model";
import { ElectricChargingStation } from "./electric-charging-station.model";
import { ParkingLorry } from "./parking-lorry.model";
import { Roadwork } from "./roadwork.model";
import { Warning } from "./warning.model";
import { Webcam } from "./webcam.model";

// Road model class
export class Road {
  constructor(
    public roadId: string,
    public roadworks: Roadwork[],
    public webcams: Webcam[],
    public parkingLorries: ParkingLorry[],
    public warnings: Warning[],
    public closures: Closure[],
    public electricChargingStations: ElectricChargingStation[]
  ) {}
}