import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import People from "./pages/People";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
const AppRoutes = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {isLoggedIn && (
          <Route
            path="/people"
            element={
              <Layout>
                <People />
              </Layout>
            }
          />
        )}
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
