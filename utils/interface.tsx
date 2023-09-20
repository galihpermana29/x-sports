export interface LoginPayloadI {
  email: string;
  password: string;
}

export type LoginDataP = {
  admin_id: number;
  email: string;
  token: string;
};

export interface LoginResponseI {
  data: LoginDataP;
}

export type TeamObjectP = {
  id: number;
  team_names: string;
  game_id: number;
  game_names: string;
  icon?: string;
  key?: number;
};

export type GamesObjectP = {
  id: number;
  game_icons: string;
  game_names: string;
  key?: number;
};

export interface TeamsResponseI {
  data: TeamObjectP[];
}

export interface GamesResponseI {
  data: GamesObjectP[];
}
