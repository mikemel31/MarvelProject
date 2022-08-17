import { useState, useEffect, useRef } from "react";

import "./charList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const {loading, error, getAllCharacters} = useMarvelService();
  const [charList, setCharList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setLoadingMore(false) : setLoadingMore(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharsList) => {
    let ended = false;
    if (newCharsList.length < 9) {
      ended = true;
    }

    setCharList((charlist) => [...charList, ...newCharsList]);
    setLoadingMore(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function listRender(chars) {
    const items = chars.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
        tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          className="char__item"
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = listRender(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !loadingMore ? <Spinner /> : null;
  const downSpinner = loadingMore ? <Spinner width={250} margin={'10px'}/> : null

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      {downSpinner}
      <button
        disabled={loadingMore}
        className="button button__main button__long"
        style={{'display': charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
export default CharList;
