
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Applayout } from "./components/Layout/Applayout";
import { ErrorPage } from "./pages/ErrorPage";

import "./App.css";

import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Country } from "./pages/Country";
import { Home } from "./pages/Home";
import { CountryDetails } from "./components/Layout/CountryDetails";



// React outer DOM
const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        errorElement: <ErrorPage />,
        children :[
            {
                path: "/",
                element: <Home />
            },

            {
                path: "about",
                element: <About />
            },

            {
                path: "country",
                element: <Country />
            },
              {
                path: "country/:id",
                element: <CountryDetails />
            },
            {
                path: "Contact",
                element: <Contact />
            },
        ]
    },
]);


const App = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}
export default App;