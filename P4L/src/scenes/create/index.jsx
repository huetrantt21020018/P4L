import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';
import { useState } from 'react';

const Create = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    age: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required"),
    username: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    username: "",
    password: "",
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={""} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Header title="Create User" subtitle="Create a New User Profile" />

              <Box p={"40px 0 40px 0"}>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                      >
                        <Typography
                            variant="h4"
                            fontWeight={"bold"}
                            display={"flex"}
                            sx={{gridColumn: "span 4"}}
                        >
                        Profile Info
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="First Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          name="firstName"
                          error={!!touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Last Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          name="lastName"
                          error={!!touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.age}
                          name="age"
                          error={!!touched.age && !!errors.age}
                          helperText={touched.age && errors.age}
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Contact Number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contact}
                          name="contact"
                          error={!!touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{ gridColumn: "span 3" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          name="address"
                          error={!!touched.address && !!errors.address}
                          helperText={touched.address && errors.address}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <Typography
                          p={"20px 0 0 0"}
                          variant="h4"
                          fontWeight={"bold"}
                          display={"flex"}
                          sx={{gridColumn: "span 4"}}
                        >
                        Login Info
                        </Typography>
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="text"
                          label="Username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          name="username"
                          error={!!touched.username && !!errors.username}
                          helperText={touched.username && errors.username}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="password"
                          label="Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          name="password"
                          error={!!touched.password && !!errors.password}
                          helperText={touched.password && errors.password}
                          sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          color="secondary"
                          type="password"
                          label="Confirm Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          name="password"
                          sx={{ gridColumn: "span 2"}}
                        />
                      </Box>
                      <Box display="flex" justifyContent="end" p="20px 0 0 0">
                        <Button type="submit" color="secondary" variant="contained" sx={{fontWeight: "bold"}}>
                          Create New User
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Create;
