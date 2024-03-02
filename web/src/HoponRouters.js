import React from "react";
import Test from "./component/Test";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const HoponRouters = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/test" element={<Test />}></Route>
        </Route>
    )
);

export default HoponRouters;