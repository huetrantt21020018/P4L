import {useEffect} from 'react';
import {LoginState} from "../types/loginState";
import {UserApi} from "../api/api2/user";
import User from "../types/user";

let state = LoginState.Unknown;
let _user : User | null = null;

export function useLoginState() {
  // let [state, setState] = useState(LoginState.Unknown);
  // let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let user = new UserApi(token);

    if (state === LoginState.Unknown) {
      user.self()
        .then(s => {
          // setState(LoginState.LoggedIn);
          state = LoginState.LoggedIn;
          // setUser(s.data);
          _user = s.data;
        }, () => {
          // setState(LoginState.None);
          state = LoginState.None;
        });
    }
  }, []);

  switch (state) {
    case LoginState.LoggedIn:
      return <const>[state, _user!, localStorage.getItem('token')];
    default:
      return <const>[state, null, localStorage.getItem('token') ?? ''];
  }
}
