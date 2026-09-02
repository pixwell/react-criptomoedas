import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { CoinDetail } from "./pages/coinDetail";
import { PageNotFound } from "./pages/pageNotFound";

const router = createBrowserRouter([
  { 
    index: true, 
    Component: Home,
  },
  {
    path: 'coin/:id',
    Component: CoinDetail,
  },
  {
    path: '*',
    Component: PageNotFound,
  },
])

export {router}
