import type React from "react";

interface Card {
  title: string;
  statistic?: number;
  icon: React.ReactElement
}

const Card: React.FC<Card> = (card: Card) => {
  return (
    <>
      <div className="card max-w-[250px] min-w-[200px] bg-base-200 shadow-md hover:shadow-xl transition duration-300 rounded-2xl border border-gray-200 my-5">
        <div className="card-body flex flex-col ">
          {card.icon}
          <h2 className="card-title">{card.title}</h2>
          <p>{card.statistic}</p>

        </div>
      </div>
    </>
  );
};

export default Card;
