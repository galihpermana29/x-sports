import { Teams } from '@/utils/types';
import api from '.';

async function getAllTeams(): Promise<Teams> {
  const { data } = await api.get<Teams>(`/games`);
  return data;
}

const GET = {
  getAllTeams,
};

export default GET;
