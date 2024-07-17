import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { SignInPage } from "../pages/SignInPage";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../store/user/selectors";

const routes = [
  { path: "/", page: <MainPage /> },
  { path: "/sign-in", page: <SignInPage /> },
];

export const AppRouter = () => {
  const token = useSelector(userTokenSelector);
  const { pathname } = useLocation();



  if(!token && pathname !== "/sign-in") {
    return <Navigate to="/sign-in" />
  }

  
  if(token && pathname === "/sign-in") {
    return <Navigate to="/" />
  }


  return (
    <Routes>
      {routes.map((p, i) => (
        <Route path={p.path} element={p.page} key={i} />
      ))}
    </Routes>
  );
};
