import { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Routess from './Routess.jsx';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EvenBus";
import React from "react";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

function App() {
  // constructor(props: Props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);

  //   this.state = {
  //     showModeratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined,
  //   };
  // }

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //       showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
  //       showAdminBoard: user.roles.includes("ROLE_ADMIN"),
  //     });
  //   }

  //   EventBus.on("logout", this.logOut);
  // }

  // componentWillUnmount() {
  //   EventBus.remove("logout", this.logOut);
  // }

  // logOut() {
  //   AuthService.logout();
  //   this.setState({
  //     showModeratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined,
  //   });
  // }

  // render() {
  //   const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

  //   return (
  //     <div>
  //       ...

  //       <div className="container mt-3">
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/home" element={<Home />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="/register" element={<Register />} />
  //           <Route path="/profile" element={<Profile />} />
  //           <Route path="/user" element={<BoardUser />} />
  //           {/* <Route path="/mod" element={<BoardModerator />} /> */}
  //           {/* <Route path="/admin" element={<BoardAdmin />} /> */}
  //         </Routes>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <Router>
      <Routess />
    </Router>
  )
}

export default App;