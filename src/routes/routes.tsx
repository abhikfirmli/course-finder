import React, { Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { THEME } from "../constants/Settings";
import { RO_INSTITUTION_PAGE } from "../constants/Routes";


const HomePage = React.lazy(
  () =>
    import(
      `../themes/${THEME}/pages/HomePage/HomePage.page`
    )
);

const InstitutionPage = React.lazy(
  () =>
    import(
      `../themes/${THEME}/pages/Institution/institution.page`
    )
);


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {/* <RouteMiddleware> */}
        <HomePage />
        {/* </RouteMiddleware> */}
      </Suspense>
    ),
  },
  {
    path: `${RO_INSTITUTION_PAGE}/:university`,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {/* <RouteMiddleware> */}
        <InstitutionPage />
        {/* </RouteMiddleware> */}
      </Suspense>
    ),
  },
]);

export default function App() {
  //   const { setSessionId } = useSiteState();

  //   useEffect(() => {
  //     setSessionId();
  //   }, [setSessionId]);

  return <RouterProvider router={router} />;
}
