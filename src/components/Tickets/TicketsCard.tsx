import { Link } from 'react-router-dom';
import { TicketContent } from '../../assets/models/tickets/datatype';

const BuyTicketsCard = (data: TicketContent) => {
  return (
    <div className="m-2 block max-w-xs rounded-lg bg-white transition duration-100 ease-in-out hover:shadow-lg hover:shadow-green-300 dark:bg-neutral-100 hover:drop-shadow-xl border-2 border-sky-500 dark:border-red-500 dark:hover:shadow-yellow-200">
      <Link to="/">
        <img
          className="rounded-t-lg"
          src={data.imageSrc}
          alt={data.imageAlt}
        />
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black">
            {data.title}
          </h5>
          <p className="mb-4 text-base text-black dark:text-black">
            {data.description}
          </p>
          <button
            type="button"
            className="inline-block rounded bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 "
          >
            {data.btnText}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BuyTicketsCard;
