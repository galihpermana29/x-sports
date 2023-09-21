import {
  GamesPayloadI,
  GamesResponseI,
  LoginPayloadI,
  LoginResponseI,
  MatchPayloadI,
  MatchResponseI,
  NewsPayloadI,
  NewsResponseI,
  TeamsPayloadI,
  TeamsResponseI,
} from '@/utils/interface';
import api from '..';

async function getTeams(): Promise<TeamsResponseI> {
  const { data } = await api.get<TeamsResponseI>('/teams');
  return data;
}

async function getGames(): Promise<GamesResponseI> {
  const { data } = await api.get<GamesResponseI>('/games');
  return data;
}

async function getMatches(): Promise<MatchResponseI> {
  const { data } = await api.get<MatchResponseI>('/matchs');
  return data;
}

async function getNews(): Promise<NewsResponseI> {
  const { data } = await api.get<NewsResponseI>('/news');
  return data;
}

async function createNews(payload: NewsPayloadI): Promise<{ data: number }> {
  const { data } = await api.post<{ data: number }>('/news', payload);
  return data;
}

async function updateNews(
  payload: NewsPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await api.patch<{ data: number }>(`/news/${id}`, payload);
  return data;
}

async function createMatch(payload: MatchPayloadI): Promise<{ data: number }> {
  const { data } = await api.post<{ data: number }>('/matchs', payload);
  return data;
}

async function updateMatch(
  payload: MatchPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await api.patch<{ data: number }>(`/matchs/${id}`, payload);
  return data;
}

async function createTeams(payload: TeamsPayloadI): Promise<{ data: number }> {
  const { data } = await api.post<{ data: number }>('/teams', payload);
  return data;
}
async function createGames(payload: GamesPayloadI): Promise<{ data: number }> {
  const { data } = await api.post<{ data: number }>('/games', payload);
  return data;
}

async function login(payload: LoginPayloadI): Promise<LoginResponseI> {
  const { data } = await api.post<LoginResponseI>(`/login`, payload);
  return data;
}

const CmsAPI = {
  login,
  getTeams,
  getGames,
  createTeams,
  createGames,
  getMatches,
  createMatch,
  updateMatch,
  getNews,
  createNews,
  updateNews,
};

export default CmsAPI;
