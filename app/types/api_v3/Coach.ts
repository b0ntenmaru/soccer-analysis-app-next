export type Coach = {
  id: number;
  team_id: number;
  coach_id: number;
  position_id: number;
  active: false,
  start: string | null;
  end: string | null;
  temporary: boolean;
};
