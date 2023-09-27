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
  ThreadPayloadI,
  ThreadResponseI,
} from '@/utils/interface';
import { cmsApi } from '..';

async function getTeams(): Promise<TeamsResponseI> {
  const { data } = await cmsApi.get<TeamsResponseI>('/teams');
  return data;
}

async function getGames(): Promise<GamesResponseI> {
  const { data } = await cmsApi.get<GamesResponseI>('/games');
  return data;
}

async function getMatches(): Promise<MatchResponseI> {
  const { data } = await cmsApi.get<MatchResponseI>(`/matchs`);
  return data;
}

async function deleteMatch(id: number): Promise<MatchResponseI> {
  const { data } = await cmsApi.delete<MatchResponseI>(`/matchs/${id}`);
  return data;
}

async function getCompletedMatches(): Promise<MatchResponseI> {
  const { data } = await cmsApi.get<MatchResponseI>(`/matchs?status=completed`);
  return data;
}

async function getNews(): Promise<NewsResponseI> {
  const { data } = await cmsApi.get<NewsResponseI>('/news');
  return data;
}

async function createNews(payload: NewsPayloadI): Promise<{ data: number }> {
  const { data } = await cmsApi.post<{ data: number }>('/news', payload);
  return data;
}

async function updateNews(
  payload: NewsPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await cmsApi.patch<{ data: number }>(`/news/${id}`, payload);
  return data;
}

async function getThreads(): Promise<ThreadResponseI> {
  const { data } = await cmsApi.get<ThreadResponseI>('/threads');
  return data;
}

async function createThread(
  payload: ThreadPayloadI
): Promise<{ data: number }> {
  const { data } = await cmsApi.post<{ data: number }>('/threads', payload);
  return data;
}

async function updateThread(
  payload: ThreadPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await cmsApi.patch<{ data: number }>(
    `/threads/${id}`,
    payload
  );
  return data;
}

async function createMatch(payload: MatchPayloadI): Promise<{ data: number }> {
  const { data } = await cmsApi.post<{ data: number }>('/matchs', payload);
  return data;
}

async function updateMatch(
  payload: MatchPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await cmsApi.patch<{ data: number }>(
    `/matchs/${id}`,
    payload
  );
  return data;
}

async function createTeams(payload: TeamsPayloadI): Promise<{ data: number }> {
  const { data } = await cmsApi.post<{ data: number }>('/teams', payload);
  return data;
}

async function updateTeams(
  payload: TeamsPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await cmsApi.patch<{ data: number }>(
    `/teams/${id}`,
    payload
  );
  return data;
}

async function createGames(payload: GamesPayloadI): Promise<{ data: number }> {
  const { data } = await cmsApi.post<{ data: number }>('/games', payload);
  return data;
}

async function updateGames(
  payload: GamesPayloadI,
  id: number
): Promise<{ data: number }> {
  const { data } = await cmsApi.patch<{ data: number }>(
    `/games/${id}`,
    payload
  );
  return data;
}

async function login(payload: LoginPayloadI): Promise<LoginResponseI> {
  const { data } = await cmsApi.post<LoginResponseI>(`/login`, payload);
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
  updateTeams,
  updateGames,
  getCompletedMatches,
  deleteMatch,
  getThreads,
  updateThread,
  createThread,
};

export default CmsAPI;
