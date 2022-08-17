import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import decoration from "../../resources/img/vision.png";

import CharInfo from "../charInfo/CharInfo";

const Main = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (selectedChar) => {
    setSelectedChar(selectedChar);
  };

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default Main
