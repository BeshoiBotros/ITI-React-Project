import type React from "react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
}: CardProps) => {
  return (
    // <div className="flex flex-wrap">
      <div className="card  min-width-[200px] w-1/2 bg-base-100 card-xl shadow-md hover:shadow-xl m-4 transition duration-300 rounded-2xl border border-gray-200">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-gray-400">{description}</p>
          <div className="justify-start card-actions">
            <button className="btn base-100 text-primary border border-primary hover:bg-primary hover:text-white">{buttonText}</button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Card;
