import {useEffect, useState} from 'react';
import {LoginState} from "../types/loginState";
import {UserApi} from "../api/api2/user";
import User from "../types/user";

let state = LoginState.Unknown;
let _user : User | null = null;

export function useLoginState() {
  let [ss, setState] = useState(0);

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
          setState(ss + 1);
        }, () => {
          // setState(LoginState.None);
          state = LoginState.None;
          setState(ss + 1);
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
