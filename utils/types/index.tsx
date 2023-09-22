export type Game = {
  id: number;
  game_names: string;
  game_icons: string;
};

export type GamesData = {
  data: Game[];
};

export type MatchDetail = {
  id: number;
  tournament_names: string;
  game_id: number;
  game_names: string;
  team_a_id: number;
  team_a_names: string;
  team_a_odds: number;
  team_a_icons: string;
  team_b_id: number;
  team_b_names: string;
  team_b_odds: number;
  team_b_icons: string;
  date: string;
  match_link: string;
  status: string;
  winner: number;
};

export type MatchDetailData = {
  data: MatchDetail;
};

export type AllMatchData = {
  data: MatchDetail[];
};
