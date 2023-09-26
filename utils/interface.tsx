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
  game_icons?: string;
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

export interface GamesPayloadI {
  game_names: string;
  game_icons: string;
}

export interface TeamsPayloadI {
  team_names: string;
  game_id: number;
  team_icons: string;
}

export interface MatchPayloadI {
  tournament_names?: string;
  game_id?: number;
  team_a_id?: number;
  team_a_odds?: number;
  team_b_id?: number;
  team_b_odds?: number;
  date?: string;
  match_link?: string;
  status?: string;
  winner?: string;
  blockchain_id?: number;
}

export interface MatchObjectI {
  id: number;
  tournament_names: string;
  game_id: number;
  game_names: string;
  team_a_id: number;
  team_a_names: string;
  team_a_odds: number;
  team_b_id: number;
  team_b_names: string;
  team_b_odds: string;
  date: string;
  match_link: string;
  status: string;
  winner: number;
}

export interface NewsObjectI {
  id: number;
  title: string;
  game_id: number;
  game_names: string;
  game_icons: string;
  description: string;
  image_news: string;
  date: string;
}

export interface NewsPayloadI {
  title: string;
  game_id: number;
  description: string;
  date: string;
  image_news: string;
}

export interface MatchResponseI {
  data: MatchObjectI[];
}

export interface NewsResponseI {
  data: NewsObjectI[];
}
