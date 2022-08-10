import "./charInfo.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
        this.updateChar()
    }
  }

  componentDidCatch(err, info) {
    this.setState({error: true})
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.setState({ loading: true, error: false });
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const {char, loading, error} = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return <div className="char__info">
        {spinner}
        {errorMessage}
        {content}
        {skeleton}
        
    </div>;
  }
}

const View = ({ char }) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const imgFit = thumbnail !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? null : {objectFit: "unset"}
    return (
  <>
    <div className="char__basics">
      <img src={thumbnail} alt={name} style={imgFit}/>
      <div>
        <div className="char__info-name">{name}</div>
        <div className="char__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
    <div className="char__descr">
      {description}
    </div>
    <div className="char__comics">Comics:</div>
    <ul className="char__comics-list">
      {comics.length === 0 ? `There are no comics for ${name} yet` : null}
      {comics.map((item, i) => {
        // eslint-disable-next-line
        if (i > 9) return;
        return (
        <li key={i} className="char__comics-item">
            {item.name}
        </li>
      )})}
    </ul>
  </>)
};

export default CharInfo;
