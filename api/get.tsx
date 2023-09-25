import {
  AllMatchData,
  GamesData,
  MatchDetailData,
  NewsData,
  NewsDetailData,
  ThreadsData,
  ThreadsDetailData,
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

async function getMatchByStatus(
  status?: 'upcoming' | 'ongoing' | 'completed'
): Promise<AllMatchData> {
  const { data } = await clientApi.get<AllMatchData>(
    `/matchs?status=${status}`
  );
  return data;
}

async function getMatchById(id: number): Promise<MatchDetailData> {
  const { data } = await clientApi.get<MatchDetailData>(`/matchs/${id}`);
  return data;
}

async function getMatchByGameId(id: number): Promise<AllMatchData> {
  const { data } = await clientApi.get<AllMatchData>(`/matchs?game_id=${id}`);
  return data;
}

async function getNewsById(id: number): Promise<NewsDetailData> {
  const { data } = await clientApi.get<NewsDetailData>(`/news/${id}`);
  return data;
}

async function getAllNews(): Promise<NewsData> {
  const { data } = await clientApi.get<NewsData>(`/news`);
  return data;
}

async function getAllThreads(): Promise<ThreadsData> {
  const { data } = await clientApi.get<ThreadsData>(`/threads`);
  return data;
}

async function getThreadById(id: number): Promise<ThreadsDetailData> {
  const { data } = await clientApi.get<ThreadsDetailData>(`/threads/${id}`);
  return data;
}

const GET = {
  getAllGames,
  getMatchById,
  getAllMatch,
  getMatchByStatus,
  getAllNews,
  getMatchByGameId,
  getNewsById,
  getAllThreads,
  getThreadById,
};

export default GET;
