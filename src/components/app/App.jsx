import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Page404 from "../pages/404";
import SingleComic from "../singleComic/SingleComic";

import ComicsPage from "../pages/ComicsPage";
import Main from "../pages/Main";

const App = (props) => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/comics/:id" element={<SingleComic />} />
            <Route exact path="/comics" element={<ComicsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
