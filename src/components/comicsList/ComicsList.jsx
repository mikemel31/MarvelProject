import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();
  const [comicsList, setComicsList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);

  useEffect(() => {onRequest(offset, true)}, [])

  const onRequest = (offset, initial) => {
    initial ? setLoadingMore(false) : setLoadingMore(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList((comicslist) => [...comicsList, ...newComicsList]);
    setLoadingMore(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  function listRender(comics) {
    const items = comics.map((item, i) => {
      return (
        <li
          className="comics__item"
          key={item.id}
        //   onClick={() => {
        //     props.onCharSelected(item.id);
        //   }}
        //   onKeyPress={(e) => {
        //     if (e.key === " " || e.key === "Enter") {
        //       props.onCharSelected(item.id);
        //     }
        //   }}
        >
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = listRender(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !loadingMore ? <Spinner /> : null;

  return (
    <div className="comics__list">
        {errorMessage}
        {spinner}
        {items}
      <button
        disabled={loadingMore}
        className="button button__main button__long"
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
