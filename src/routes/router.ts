import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { CoinDetail } from "../pages/coinDetail";
import { PageNotFound } from "../pages/pageNotFound";
import { Layout } from "../components/layout";
import { SearchResults } from "../pages/serchResults";
import { ROUTES } from "../routes/route-list";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { 
        index: true, 
        Component: Home,
      },
      {
        path: ROUTES.coinDetail.path,
        Component: CoinDetail,
      },
      {
        path: ROUTES.searchResults,
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
