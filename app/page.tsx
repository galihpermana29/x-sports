export default function Home() {
  return (
    <main className="flex flex-col gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section>
        <h2 className="font-semibold text-xl mb-5">Livestream Spotlight</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full basis-[40%] aspect-video bg-xport-black-alternate"></div>
          <div className="basis-auto flex flex-col">
            <h3 className="text-xl font-semibold">
              <span className="text-xport-orange-primary">
                Match of The Day -{' '}
              </span>{' '}
              Evos vs RRQ
            </h3>
          </div>
        </div>
      </section>
      <section>
        <h2 className="font-semibold text-xl mb-5">
          <span className="text-xport-orange-primary">
            Mobile Legends : Bang Bang
          </span>{' '}
          Ongoing Livestream
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
          <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
          <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
          <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
        </div>
      </section>
      <section>
        <h2 className="font-semibold text-xl mb-5">
          <span className="text-xport-orange-primary">Latest</span> News
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mt-7">
          <div className="md:basis-[35%] flex flex-col gap-4">
            <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
            <div className="w-full aspect-video bg-xport-black-alternate rounded"></div>
          </div>
          <div className="w-full md:basis-[75%] bg-xport-black-alternate rounded"></div>
        </div>
      </section>
    </main>
  );
}
