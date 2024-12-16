export interface Events {
  data: Event[];
  meta: Meta;
}

export interface Event {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  Date:        Date;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  Location:    Location;
  Url:         null | string;
  Private:     boolean;
  Title:       string;
  Type:        Type;
  Time:        null | string;
}

export interface Location {
  address:     string;
  coordinates: Coordinates;
  geohash:     string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export enum Type {
  Boda = "Boda",
  BodaAlbacete = "Boda Albacete",
  Concierto = "Concierto",
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}
