import { Component } from 'react'

import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

class CharList extends Component {
 
  state = {
    charsList: [],
    loading: true,
    error: false,
    loadingMore: false,
    offset: 210
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onCharListLoading = () => {
    this.setState({loadingMore: true})
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (newCharsList) => {
    this.setState(({offset, charsList}) => ({ 
      charsList: [...charsList, ...newCharsList], 
      loading: false, 
      loadingMore: false,
      offset: offset + 9
    }));
    console.log(newCharsList)
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  listRender = (chars) => {
    const items = chars.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li className="char__item" key={item.id}
        onClick={() => {this.props.onCharSelected(item.id)
        }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charsList, loading, error, offset, loadingMore } = this.state;
    const items = this.listRender(charsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button disabled={loadingMore} className="button button__main button__long" onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
  }
}

export default CharList;
