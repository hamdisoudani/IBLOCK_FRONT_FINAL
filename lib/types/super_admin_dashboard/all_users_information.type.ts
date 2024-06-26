export interface SuperAdminAllUsers {
    coord: Coord;
    weather?: (SuperAdminAllUsersEntity)[] | null;
    base: string;
    main: Main;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
  }
  export interface Coord {
    lon: number;
    lat: number;
  }
  export interface SuperAdminAllUsersEntity {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  }
  export interface Wind {
    speed: number;
    deg: number;
  }
  export interface Clouds {
    all: number;
  }
  export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  