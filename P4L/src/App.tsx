import "./App.css";
import User from './types/user.js';
import {useLoginState} from "./hooks/loginState";
import {Navbar} from "./components/Navbar";
import {LoginContext} from "./context/loginContext";
import {Route, Routes, useMatch} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

// import EventBus from "./common/EvenBus.js";
import ProductList from './scenes/product-list/index';

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: User | undefined
}

function App() {
  let [loginState, user, token] = useLoginState();
  let isLogin = useMatch("/login");
  let isRegister = useMatch("/register");

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
  // return (
  //   <Router>
  //     <Routess />
  //   </Router>
  //
  // )
  // const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  // return(
  // <ColorModeContext.Provider value={colorMode}>
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <div className="app">
  //         <Sidebar isSidebar={isSidebar} />
  //         <main className="content">
  //           <Topbar setIsSidebar={setIsSidebar} />
  //           <Routes>
  //             <Route path="/" element={<Dashboard />} />
  //             <Route path="/purchase" element={<Purchase />} />
  //             <Route path='/profile' element={<Profile />}/>
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/register" element={<Register />} />
  //             <Route path="/cart" element={<Payment />} />
  //           </Routes>
  //         </main>
  //       </div>
  //     </ThemeProvider>
  //   </ColorModeContext.Provider>
  // );

  return (
    <LoginContext.Provider value={[loginState, user, token]}>
      <div>
        {(!isLogin && !isRegister) && <Navbar/>}
        <Routes>
          <Route path={"/"} />
          <Route path={"/products"} element={<ProductList />} />
          <Route path={"/products/:id"} element={<ProductList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  )
}

export default App;
