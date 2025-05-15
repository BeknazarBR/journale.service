export interface IServiceResponse {
  _id: string;
  title: string;
  price: string;
  description: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface ISSResponse {
  _id: string;
  duration: number;
  service: IServiceResponse;
}
