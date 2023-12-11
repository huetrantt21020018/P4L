import {createContext} from 'react';
import type {useLoginState} from '../hooks/loginState';
import {LoginState} from "../types/loginState";

type T = ReturnType<typeof useLoginState>;
export const LoginContext = createContext<T>([LoginState.Unknown, null]);
