export interface Location {
    latitude: number;
    longitude: number;
  }

export interface SearchData {
    start: Location,
    end: Location,
    polyline: String
}