import "./charInfo.scss";
import { useState, useEffect, lazy, Suspense } from "react";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";
const ErrorMessage = lazy(() => import("../errorMessage/ErrorMessage"));
const Spinner = lazy(() =>
  import("../spinner/spinner").then((module) => ({
    default: module.altSpinner,
  }))
);
const View = lazy(() => import("./CharInfoView"));

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { error, loading, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    getCharacter(charId).then(onCharLoaded);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      <Suspense fallback={<Skeleton />}>{spinner}</Suspense>
      {errorMessage}
      {content}
      {skeleton}
    </div>
  );
};

export default CharInfo;
