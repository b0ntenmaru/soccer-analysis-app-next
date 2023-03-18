import type { Country } from '@/app/types/Country';

export type Team = {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number;
  gender: string;
  name: string;
  short_code: string;
  image_path: string;
  founded: number;
  type: string;
  placeholder: false;
  last_played_at: string;
  country: Country;
}
