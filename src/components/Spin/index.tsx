import spinImg from '@assets/cinema.png';

import './style.scss';

export default function Spin() {
  return (
    <div className="spin">
      <img className="spin__img" src={spinImg} alt="loading..." />
    </div>
  );
}
