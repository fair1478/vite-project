import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import GalleryLayout from "./layout/GalleryLayout.jsx";
import Filter from "./components/Filter.jsx";
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PropertyDetail = lazy(() =>
  import("./pages/property/PropertyDetail.jsx")
);
const PropertyPage = lazy(() => import("./pages/property/PropertyPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const router = createBrowserRouter([
  {
    element: <Filter />,
    children: [
      {
        element: <GalleryLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "/properties/:id",
            element: (
              <Suspense fallback={<Spinner />}>
                <PropertyDetail />
              </Suspense>
            ),
          },
          {
            path: "/properties",
            element: (
              <Suspense fallback={<Spinner />}>
                <PropertyPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/not-found",
    element: (
      <Suspense fallback={<Spinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
