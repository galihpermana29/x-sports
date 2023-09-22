import { AllMatchData, GamesData, MatchDetailData } from '@/utils/types';
import api from '.';

async function getAllGames(): Promise<GamesData> {
  const { data } = await api.get<GamesData>(`/games`);
  return data;
}

async function getAllMatch(): Promise<AllMatchData> {
  const { data } = await api.get<AllMatchData>(`/matchs`);
  return data;
}
async function getMatchById(id: number): Promise<MatchDetailData> {
  const { data } = await api.get<MatchDetailData>(`/matchs/${id}`);
  return data;
}

const GET = {
  getAllGames,
  getMatchById,
  getAllMatch,
};

export default GET;
