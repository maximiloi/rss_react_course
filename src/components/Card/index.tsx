import { Component } from 'react';
import ApiResponse from '../../helper/apiResponce';
import LocalStorage from '../../helper/localStorage';

import './style.scss';

interface Props {
  searchWord: string;
}

interface StateResponce {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

class Card extends Component<Props, StateResponce> {
  constructor(props: Props) {
    super(props);
    this.state = { responseData: null };
  }

  async componentDidMount() {
    if (!LocalStorage.getResult()) return;

    const valueLocalStorage = LocalStorage.getResult();
    const response = await ApiResponse.fetchData(valueLocalStorage);

    this.setState({ responseData: response });
  }

  async componentDidUpdate(prevProps: Props) {
    const { searchWord } = this.props;

    if (prevProps.searchWord !== searchWord) {
      const response = await ApiResponse.fetchData(searchWord);

      this.setState({ responseData: response });
    }
  }

  render() {
    const { responseData } = this.state;
    console.log('responseData: ', responseData);

    return (
      <div className="card card__wrapper">
        {responseData &&
          responseData.map(({ imdbID, Title, Poster, Year }) => (
            <div className="card__item" key={imdbID}>
              <img
                className="card__img"
                src={Poster}
                alt={Title}
                width="182px"
                height="268px"
              />
              <p>{Year}</p>
              <h3>{Title}</h3>
            </div>
          ))}
      </div>
    );
  }
}

export default Card;
