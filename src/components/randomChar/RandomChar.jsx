import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import {altSpinner as Spinner} from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = (props) => {

  const [char, setChar] = useState({});

  const {loading, error, getCharacter, clearError} = useMarvelService();  
  
  const onCharLoaded = (char) => {
    setChar(char);
  }
  
  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded)
  };
  
  useEffect(() => {updateChar()}, [])

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {spinner}
        {errorMessage}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner" onClick={updateChar}>
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }

const View = ({char}) => {
    const {name, description, thumbnail, homepageHref, wikiHref} = char;

    let imgFit = () => {if (thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {return {objectFit: 'fill'}}};
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgFit()}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepageHref} target="_blank" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wikiHref} target="_blank" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
