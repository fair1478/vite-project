import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { NavbarWithSearch } from "./layout/Layout.jsx";
// import { AnonymousRoutes } from "./components/AnonymousRoutes.jsx";
import { Spinner } from "@material-tailwind/react";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));

const router = createBrowserRouter([
  {
    element: <NavbarWithSearch />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div>
                <Spinner className="h-8 w-8" />
              </div>
            }
          >
            <HomePage />
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
