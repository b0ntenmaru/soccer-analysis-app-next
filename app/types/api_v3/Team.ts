import type { Country } from '@/app/types/api_v3/Country';
import { Coach } from '@/app/types/api_v3/Coach';
import { Season } from '@/app/types/api_v3/Season';

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
  coaches: Array<Coach>;
  seasons: Array<Season>;
  activeseasons: Array<Season>;
}
