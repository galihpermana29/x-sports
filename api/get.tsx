import {
  AllMatchData,
  GamesData,
  MatchDetailData,
  NewsData,
} from '@/utils/types';
import { clientApi } from '.';

async function getAllGames(): Promise<GamesData> {
  const { data } = await clientApi.get<GamesData>(`/games`);
  return data;
}

async function getAllMatch(): Promise<AllMatchData> {
  const { data } = await clientApi.get<AllMatchData>(`/matchs`);
  return data;
}
async function getMatchById(id: number): Promise<MatchDetailData> {
  const { data } = await clientApi.get<MatchDetailData>(`/matchs/${id}`);
  return data;
}

async function getAllNews(): Promise<NewsData> {
  const { data } = await clientApi.get<NewsData>(`/news`);
  return data;
}

const GET = {
  getAllGames,
  getMatchById,
  getAllMatch,
  getAllNews,
};

export default GET;