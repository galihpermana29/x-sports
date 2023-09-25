import GET from '@/api/get';
import MatchCard from '@/components/shared/MatchCard';

async function StreamListPage({ params }: { params: { id: string } }) {
  const { data: ongoingMatch } = await GET.getMatchByGameId(
    parseInt(params.id)
  );
  const { data } = await GET.getAllGames();
  const gameName = data.find(({ id }) => id === parseInt(params.id)).game_names;

  return (
    <main className="flex flex-col gap-5 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <h2 className="font-semibold">
        <span className="text-xport-orange-primary">{gameName}</span>{' '}
        Today&apos;s Match{' '}
      </h2>
      {ongoingMatch
        ?.sort(({ status }) => {
          if (status === 'ongoing') return -1;
        })
        .map((match) => {
          return (
            match.status !== 'completed' && (
              <MatchCard key={match.id} {...match} />
            )
          );
        })}
      {ongoingMatch?.length === 0 && (
        <span className="italic text-xport-gray-primary font-medium">
          No Match Found
        </span>
      )}
    </main>
  );
}

export default StreamListPage;
