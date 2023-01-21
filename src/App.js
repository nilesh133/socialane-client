import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components import
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserPrivateRoute from './private/UserPrivateRoute';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Userprofile from './components/Userprofile/Userprofile';
import ProfileView from './components/ProfileView/ProfileView';
import { useSelector } from 'react-redux';

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user-register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>

          <Route path="/feed" element=
            {<UserPrivateRoute>
              <UserDashboard />
            </UserPrivateRoute>}>
          </Route>

          <Route path="/user-profile" element=
            {<UserPrivateRoute>
              <Userprofile />
            </UserPrivateRoute>}>
          </Route>

          <Route path="/profile-view/:username" element=
            {<UserPrivateRoute>
              <ProfileView />
            </UserPrivateRoute>}>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;