import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { CoinDetail } from "./pages/coinDetail";
import { PageNotFound } from "./pages/pageNotFound";
import { Layout } from "./components/layout";

const coinPath = '/coin';

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
        path: '*',
        Component: PageNotFound,
      }
    ]
  },
])

export {router, coinPath}
