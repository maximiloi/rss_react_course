import './style.scss';
import spinImg from '@assets/cinema.png';

export default function Spin() {
  return (
    <div className="spin">
      <img className="spin__img" src={spinImg} alt="loading" />
    </div>
  );
}
