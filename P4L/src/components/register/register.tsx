import {Component, useState} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { notification } from 'antd';
import * as Yup from "yup";

import AuthService from "../../services/auth.service";
import '../../../src/index2.css';
import './index.css';
import {Link, Navigate, useNavigate} from 'react-router-dom';

// @ts-ignore
import BG_login from '../../assets/BG-login.png';
// @ts-ignore
import WhiteBG from '../../assets/WhiteBG.png';
import {useLoginState} from "../../hooks/loginState";
import {LoginState} from "../../types/loginState";
import {AuthApi} from "../../api/api2/auth";

function validationSchema() {
  return Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Tài khoản phải từ 3 đến 20 ký tự",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "Mật khẩu phải từ 4 đến 40 ký tự",
        (val: any) =>
          val &&
          val.toString().length >= 4 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    email: Yup.string().required("This field is required!")
  });
}

function Register() {
  let [loginState, _] = useLoginState();
  let [successful, setSuccessful] = useState(false);
  let [message, setMessage] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [noti, notiContextHolder] = notification.useNotification();
  let fieldClassName = "login-input-field";

  if (loginState === LoginState.LoggedIn) {
    navigate('/');
  }

  const handleLogin = (formValue: { username: string; password: string, name: string, email: string }) => {
    const {username, password, name, email} = formValue;

    let authApi = new AuthApi();
    setLoading(true);
    setSuccessful(false);
    setMessage('');
    authApi.register(username, password, name || username, email)
      .then(res => {
        if (res.success) {
          navigate('/login');
          noti.success({
            message: 'Đăng ký thành công!'
          })
        } else {
          setMessage(res.error);
        }

        setLoading(false);
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
        setSuccessful(false);

      })
  }

  return (
    <div className="flex flex-col justify-center min-h-screen overflow-hidden">
      {notiContextHolder}
      <style>
        html {"{"}
        background-image: url('{WhiteBG}')
        {"}"}
      </style>
      <div className="bg-white rounded-lg shadow-xl mx-6 md:mx-auto md:max-w-lg md:w-full lg:max-w-2xl xl:max-w-3xl">
        <div className="grid grid-cols-2">
          <div style={{ backgroundImage: `url('${BG_login}')` }} className="bg-center py-6 pl-6 rounded-l-lg">
          </div>
          <div className={"min-h-[20rem] p-6"}>
            <Formik
              initialValues={{
                "username": "",
                "password": "",
                "email": "",
                "name": ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}>
              <Form>
                <div>
                  <div className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="username"
                        className="login-field-label"
                      >
                        Tài khoản
                      </label>
                      <Field
                        disabled={loading}
                        type="text"
                        name="username"
                        className={fieldClassName}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <br/>
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="login-field-label"
                      >
                        Email
                      </label>
                      <Field
                        disabled={loading}
                        type="email"
                        name="email"
                        className={fieldClassName}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <br />
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="login-field-label"
                      >
                        Tên hiển thị
                      </label>
                      <Field
                        disabled={loading}
                        type="text"
                        name="name"
                        className={fieldClassName}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <br />
                    <div className="mb-2">
                      <label
                        htmlFor="password"
                        className="login-field-label"
                      >
                        Mật khẩu
                      </label>
                      <Field
                        disabled={loading}
                        type="password"
                        name="password"
                        className={fieldClassName}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="login-submit-button" disabled={loading}>
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
                {message && (
                  <div className="form-group">
                    <div className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                         role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
