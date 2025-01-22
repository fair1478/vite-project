import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/Layout.jsx";
import { Spinner } from "@material-tailwind/react";
import PropertyDetail from "./pages/property/PropertyDetail.jsx";
import GalleryLayout from "./layout/GalleryLayout.jsx";
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PropertyPage = lazy(() => import("./pages/property/PropertyPage.jsx"));
const router = createBrowserRouter([
  {
    element: <Layout />,
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
    ],
  },
  {
    element: <GalleryLayout />,
    children: [
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
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
