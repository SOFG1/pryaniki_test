import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { SignInPage } from "./pages/SignInPage";

const routes = [
  { path: "/", page: <MainPage /> },
  { path: "/sign-in", page: <SignInPage /> },
];

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((p) => (
        <Route path={p.path} element={p.page} />
      ))}
    </Routes>
  );
};
