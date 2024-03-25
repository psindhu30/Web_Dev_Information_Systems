import "./styles/app.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import SingleHotel from "./pages/SingleHotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Admin from "./pages/Admin";
import { userCols, hotelCols, roomCols } from "./utils/data";
import NewUser from "./components/NewUser";
import NewHotel from "./components/NewHotel";
import NewRoom from "./components/NewRoom";
import Profile from "./components/Profile";

function App() {
  const { user } = useContext(AuthContext);

  const Protected = ({ children }) => {
    if (!user.isAdmin) {
      return (
        <Navigate
          replace={true}
          to="/login"
        ></Navigate>
      );
    }
    return children;
  };

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/hotels"
          element={<Hotels />}
        />
       
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={
            <Register
              title={"Sign up"}
              signup={true}
              btntext={"sign up"}
            />
          }
        />
        <Route
          path="/hotel/:id"
          element={<SingleHotel />}
        />
        <Route
          path="/dashboard/user"
          element={
            <Protected>
              <Admin column={userCols} />
            </Protected>
          }
        />
        <Route
          path="/dashboard/hotel"
          element={
            <Protected>
              <Admin column={hotelCols} />
            </Protected>
          }
        />
        <Route
          path="/dashboard/room"
          element={
            <Protected>
              <Admin column={roomCols} />
            </Protected>
          }
        />
        <Route
          path="/dashboard/newuser"
          element={
            <Protected>
              <NewUser />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/dashboard/newhotel"
          element={
            <Protected>
              <NewHotel />
            </Protected>
          }
        />
        <Route
          path="/dashboard/newroom"
          element={
            <Protected>
              <NewRoom />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
