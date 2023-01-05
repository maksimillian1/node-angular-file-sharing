export interface BaseModel {
  id: number;
  updated_at: string;
  created_at: string;
}

export interface UuidBaseModel {
  id: string;
  updated_at: string;
  created_at: string;
}

export interface BaseModelWithLocation extends BaseModel {
  address: string;
  city: string;
  country_code: string;
  country_name: string;
  lng: number;
  ltd: number;
  place_id: string;
  postal_code?: string;
  state: string;
}

export interface BaseModelList<T> {
  data: T[];
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  last_page: number;

  path?: string;
  links?: string[];
  first_page_url?: string;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  last_page_url?: string;
}

export const EmptyBaseModelListResponse = {
  data: [],
  from: 0,
  to: 0,
  per_page: 0,
  total: 0,
  current_page: 0,
  last_page: 0,
};
