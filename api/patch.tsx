import { clientApi } from '.';

async function updateMatchStatus(
  payload: { status: 'upcoming' | 'ongoing' | 'completed' },
  id: number
): Promise<{ data: number }> {
  const { data } = await clientApi.patch<{ data: number }>(
    `/matchs/${id}`,
    payload
  );
  return data;
}

const PATCH = {
  updateMatchStatus,
};

export default PATCH;
