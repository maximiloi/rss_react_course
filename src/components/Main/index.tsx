import { Component } from 'react';
import LocalStorage from '../../helper/localStorage';

import './style.scss';

interface Props {}

interface State {
  data: [] | string | null;
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    const value = LocalStorage.getResult();
    if (value === undefined) {
      this.setState({ data: 'type in title of movie in English' });
    } else {
      this.setState({ data: value });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <main>
        <h2>{data}</h2>
      </main>
    );
  }
}

export default Main;
