import {
  GamesResponseI,
  LoginPayloadI,
  LoginResponseI,
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

async function login(payload: LoginPayloadI): Promise<LoginResponseI> {
  const { data } = await api.post<LoginResponseI>(`/login`, payload);
  return data;
}

const CmsAPI = {
  login,
  getTeams,
  getGames,
};

export default CmsAPI;
