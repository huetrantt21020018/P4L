import { Component } from "react";
import { Navigate, Router, Route, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";
import '../../../src/index2.css'
import "./index.css";
import BG_login from '../../assets/BG-login.png';

type Props = {};

type State = {
  redirect: string | null,
  username: string,
  password: string,
  loading: boolean,
  message: string,
  successful: boolean,
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: "",
      successful: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
  }

  componentWillUnmount() {
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string(),
    });
  }

  handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });


    AuthService.login(username, password).then(
      () => {
        this.setState({
          successful: true,
          redirect: "/profile"
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
          successful: false,
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

    let fieldClassName = "login-input-field";

    return (
      <div className="flex flex-col justify-center min-h-screen overflow-hidden">
        {/* will have to remove this later */}
        <style>
          html {"{"}
            background-image: linear-gradient(to bottom, #16e5de, #4bf0c2, #86f89e, #c1fb79, #fff85b)
          {"}"}
        </style>
        <div className="bg-white rounded-lg shadow-xl mx-6 md:mx-auto md:max-w-lg md:w-full lg:max-w-2xl xl:max-w-3xl">
          <div className="grid grid-cols-2">
            <div style={{ backgroundImage: `url('${BG_login}')` }} className="bg-center py-6 pl-6 rounded-l-lg">
            </div>
            <div className={"min-h-[20rem] p-6"}>
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleLogin}>
                <Form>
                  {!successful && (
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
                            htmlFor="password"
                            className="login-field-label"
                          >
                            Mật khẩu
                          </label>
                          <Field
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
                        <div className="register-text">
                          Không có tài khoản? <Link to="/register">Đăng ký</Link>
                        </div>
                        <div className="mt-6">
                          <button type="submit" className="login-submit-button">
                            Đăng nhập
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
}
