import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";
import '../../../src/index2.css';
import './index.css';

type Props = {};

type State = {
  username: string,
  email: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      username,
      email,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
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
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    let fieldClassName = "register-input-field";

    return (
      <div className="flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="p-6 bg-white rounded-md shadow-xl mx-6 md:mx-auto md:max-w-lg md:w-full lg:max-w-xl xl:max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              left side
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleRegister}>
                <Form>
                  {!successful && (
                    <div>
                      <div className="mt-6">
                        <div className="mb-2">
                          <label
                            htmlFor="username"
                            className="register-field-label"
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
                            className="register-field-label"
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
                          Không có tài khoản? <a href="/register">Đăng ký</a>
                        </div>
                        <div className="mt-6">
                          <button type="submit" className="register-submit-button">
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
    );
  }
}
