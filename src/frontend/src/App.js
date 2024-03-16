import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Login from './components/login/login';
import TodoWrapper from './components/todo/TodoWrapper';
import Dashboard from './components/dashboard/Dashboard';
// import Profile from './components/profile/Profile';
import ProfileWrapper from './components/profile/ProfileWrapper';

function App() {
  return (
    <div className="App">
      <>
        <Router>
          {/* <Navbar refToScrollCertifications={scrollToComponentRefCe} refToScrollProducts={scrollToComponentRefP} refToScrollAbout={scrollToComponentRefA} refToScrollContact={scrollToComponentRefCo} refToScrollMap={scrollToComponentRefM} /> */}
          <Routes>
            <Route
              exact
              path="/"
              element={<Home/>}
            />
            <Route
              exact
              path="/register"
              element={<Register/>}
            />
            <Route
              exact
              path="/login"
              element={<Login/>}
            />
            <Route
              exact
              path="/todo"
              element={<TodoWrapper/>}
            />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard/>}
            />
            <Route
              exact
              path="/profile"
              element={<ProfileWrapper/>}
            />

            {/* <Route exact path="/members" element={<Members />} /> */}
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
