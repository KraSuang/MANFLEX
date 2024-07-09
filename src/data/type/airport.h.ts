export type Airport = {
    id: number;
    ident: string;
    type: string;
    name: string;
    latitude_deg: string;
    longitude_deg: string;
    elevation_ft: number;
    continent?: string;
    iso_country?: string;
    iso_region?: string;
    municipality: string;
    scheduled_service?: string;
    gps_code: string;
    iata_code: string;
    local_code?: string;
    home_link?: string;
    wikipedia_link?: string;
    keywords?: string;
    runways: Runway[];
}


type Runway = {
    id: number;
    airport_ref: number;
    airport_ident: string;
    length_ft: number;
    width_ft: number;
    surface: string;
    lighted: string;
    closed: string;
    le_ident: string;
    le_latitude_deg: string;
    le_longitude_deg: string;
    le_elevation_ft: number;
    le_heading_degT: number;
    le_displaced_threshold_ft: number;
    he_ident: string;
    he_latitude_deg: string;
    he_longitude_deg: string;
    he_elevation_ft: number;
    he_heading_degT: number;
    he_displaced_threshold_ft: number;
}