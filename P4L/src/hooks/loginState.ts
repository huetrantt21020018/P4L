import {useEffect, useState} from 'react';
import {LoginState} from "../types/loginState";
import {UserApi} from "../api/api2/user";
import User from "../types/user";

export function useLoginState() {
  let [state, setState] = useState(LoginState.Unknown);
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let user = new UserApi(token);

    user.self()
      .then(s => {
        setState(LoginState.LoggedIn);
        setUser(s.data);
      }, () => {
        setState(LoginState.None);
      });
  }, []);

  switch (state) {
    case LoginState.LoggedIn:
      return <const>[state, user!];
    default:
      return <const>[state, null];
  }
}
