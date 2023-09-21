import CalendarIcon from '@/components/icons/CalendarIcon';
import GameIcon from '@/components/icons/GameIcon';

function NewsCard() {
  return (
    <div className="flex flex-col md:flex-row gap-5 cursor-pointer hover:bg-xport-black-light transition-all duration-150 rounded">
      <div className="md:basis-[30%] bg-xport-black-alternate rounded w-full aspect-video"></div>
      <div className="md:basis-[70%] flex flex-col gap-2">
        <h3 className="font-semibold text-xl">MPL ID S12 Week 7 Schedule</h3>
        <div className="flex gap-5">
          <div className="flex items-center gap-2 text-xport-gray-primary">
            <CalendarIcon className="w-6 aspect-square fill-xport-gray-primary" />
            <span className="font-medium text-sm">03/03/2023</span>
          </div>
          <div className="flex items-center gap-2 text-xport-gray-primary">
            <GameIcon className="w-6 aspect-square fill-xport-gray-primary" />
            <span className="font-medium text-sm">MLBB</span>
          </div>
        </div>
        <p className="line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          fugit, ipsum voluptates totam, impedit repudiandae officiis,
          laboriosam hic voluptas necessitatibus consequuntur repellendus
          pariatur sequi asperiores. Facilis ad dolore dolores fuga deserunt
          doloremque labore cupiditate laborum quos rem ducimus, voluptatum
          porro, quibusdam quas voluptas autem. Quisquam eaque tempore iusto
          velit perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ullam quos repellendus aut quae culpa perferendis quasi,
          deserunt sint sit illum officia. In, sequi repudiandae esse recusandae
          autem aspernatur, libero non rerum, eligendi iusto odit. Ut, maxime in
          quasi fuga cum quas tenetur atque itaque molestiae perspiciatis beatae
          velit sint officia iusto quae voluptatum deserunt a similique neque
          voluptatibus exercitationem sequi praesentium unde non. Numquam,
          commodi dicta suscipit nulla, consequuntur aut odio atque explicabo
          repellendus nobis voluptas quos officiis, ipsam repudiandae eveniet
          consectetur nisi ab minima pariatur vel asperiores excepturi a.
          Quaerat maxime, debitis consequatur ipsum enim cumque voluptatum! Aut
          provident ex excepturi a totam, tenetur inventore tempore dolore!
          Dolore aperiam veritatis quae quibusdam id est quia illum
          voluptatibus, impedit natus omnis placeat ratione quam, vero aut
          commodi molestiae sunt sapiente.
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
