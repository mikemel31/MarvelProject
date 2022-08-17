import "./singleComic.scss";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { altSpinner as Spinner } from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SingleComic = (props) => {
  const { error, loading, clearError, getComic } = useMarvelService();
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    onRequest();
  }, [id]);

  const onRequest = () => {
    clearError();
    getComic(id).then(onSingleComicLoaded);
  };

  const onSingleComicLoaded = (comic) => {
    setComic(comic);
  };

  const View = () => {
    const { title, description, thumbnail, pages, lang, price } = comic;
    console.log(comic);

    return (
      <>
        <img src={thumbnail} alt={title} className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">Pages: {pages}</p>
          <p className="single-comic__descr">Language: {lang}</p>
          <div className="single-comic__price">Comic price: {price}$</div>
        </div>
      </>
    );
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      <div className="single-comic">
        {spinner}
        {errorMessage}
        {content}
        <Link to="/comics" className="single-comic__back">
          Back to all
        </Link>
      </div>
    </>
  );
};

export default SingleComic;
