import "./Card.scss";
import { User } from "../types";

interface CardProps {
  user: User;
}

const Card = ({ user }: CardProps) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="image">{user.first_name[0] + user.last_name[0]}</div>
        <div className="info">
          <div className="name">{user.first_name + " " + user.last_name}</div>
          <div className="email">{user.email}</div>
          <div className="instrument">
            {user.instrument[0].toUpperCase() + user.instrument.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
