import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { lazy } from "react";
import { Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";

import Main from "../pages/Main";
const SingleComic = lazy(() => import("../singleComic/SingleComic"));
const Spinner = lazy(() => import('../spinner/spinner'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const Page404 = lazy(() => import('../pages/404'))

const App = (props) => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/comics/:id" element={<SingleComic />} />
            <Route exact path="/comics" element={<ComicsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
