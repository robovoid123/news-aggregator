import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { Home } from "./Home/Home";
import { Search } from "./Search/Search";
import { News } from "./News/News";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Search />} />
      <Route path="/news" element={<News />} />
    </>
  )
);