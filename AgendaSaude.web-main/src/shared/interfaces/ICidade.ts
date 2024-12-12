export interface ICidade {
  id?: string;
  uf?: string;
  geo: {
    lat: number;
    lng: number;
  };
}
