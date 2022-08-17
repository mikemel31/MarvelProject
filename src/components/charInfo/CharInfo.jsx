import "./charInfo.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import {altSpinner as Spinner} from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {error, loading, getCharacter} =  useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    getCharacter(charId).then(onCharLoaded)
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {spinner}
      {errorMessage}
      {content}
      {skeleton}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepageHref, wikiHref, comics } = char;
  const imgFit =
    thumbnail !==
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? null
      : { objectFit: "unset" };
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgFit} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepageHref} target="_blank" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wikiHref} target="_blank" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
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
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
