import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SearchBarWithSticky } from "./layout/Layout.jsx";
import { Spinner } from "@material-tailwind/react";
import PropertyDetail from "./pages/property/PropertyDetail.jsx";
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PropertyPage = lazy(() => import("./pages/property/PropertyPage.jsx"));
const router = createBrowserRouter([
  {
    element: <SearchBarWithSticky />,
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
        path: "/properties",
        element: (
          <Suspense fallback={<Spinner />}>
            <PropertyPage />
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
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
