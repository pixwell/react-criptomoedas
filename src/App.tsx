import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { CoinDetail } from "./pages/coinDetail";
import { PageNotFound } from "./pages/pageNotFound";
import { Layout } from "./components/layout";
import { SearchResults } from "./pages/serchResults";

const coinPath = '/coin';
const searchPath = '/search';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { 
        index: true, 
        Component: Home,
      },
      {
        path: `${coinPath}/:id`,
        Component: CoinDetail,
      },
      {
        path: searchPath,
        Component: SearchResults,
      },
      {
        path: '*',
        Component: PageNotFound,
      }
    ]
  },
])

export {router, coinPath, searchPath}
