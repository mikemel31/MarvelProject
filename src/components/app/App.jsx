import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import { useState } from "react";

const App = (props) => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (selectedChar) => {
        setSelectedChar(selectedChar)
    }

   
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharSelected={onCharSelected}/>
            <CharInfo charId={selectedChar}/>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }

export default App;
