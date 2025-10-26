import type React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  to: string
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  to,
}: CardProps) => {
  return (
    <div className="card w-full min-w-[200px] bg-base-200 shadow-md hover:shadow-xl transition duration-300 rounded-2xl border border-gray-200">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-gray-400">{description}</p>
        <div className="card-actions justify-start">
          <Link to={to} className="btn bg-base-100 text-primary border border-primary hover:bg-primary hover:text-white">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
