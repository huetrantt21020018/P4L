import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import UserImage from "../../assets/user.jpg";
import Create from "../create";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';
import { useState } from 'react';

const Profile = () => {
  const theme2 = useTheme();
  const colors = tokens(theme2.palette.mode);
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
              <Header title={"Profile"} subtitle={"Admin Profile"} />
              <Box p={"40px 0 40px 0"}>
                <Grid
                  container
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  {/* Image Profile */}
                  <Box
                    width={"24%"}
                    height={"fit-content"}
                    backgroundColor={colors.primary[400]}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ borderRadius: "10px", flexDirection: "column" }}
                  >
                    <Typography
                      p={"20px 0 10px 0"}
                      variant="h4"
                      fontWeight={"bold"}
                      display={"flex"}
                    >
                      Profile
                    </Typography>
                    <Box p={"10px"} justifyContent="center" alignItems="center">
                      <img
                        alt="profile-user"
                        width="150px"
                        height="150px"
                        src={UserImage}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                      />
                    </Box>
                    <Typography p={"0 0 5px 0"} variant="h5">
                      Admin
                    </Typography>
                    <Box p={"10px"}>
                      <Button type="submit" color="secondary" variant="contained">
                        <Typography sx={{ fontWeight: "bold" }}>
                          Upload Photo
                        </Typography>
                      </Button>
                    </Box>
                  </Box>

                  {/* Edit Profile */}
                  <Box
                    width={"74%"}
                    height={"fit-content"}
                    backgroundColor={colors.primary[400]}
                    display={"flex"}
                    // alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ borderRadius: "10px", flexDirection: "column" }}
                  >
                    <Box p={"20px"}>
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
                                "& > div": {
                                  gridColumn: isNonMobile ? undefined : "span 4",
                                },
                              }}
                            >
                              <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                display={"flex"}
                                sx={{ gridColumn: "span 4" }}
                              >
                                Edit Profile
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
                                defaultValue="Admin"
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
                                defaultValue="Default Value"
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
                                value={values.address1}
                                name="address"
                                error={!!touched.address1 && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
                                sx={{ gridColumn: "span 4" }}
                              />
                              <Typography
                                p={"20px 0 0 0"}
                                variant="h4"
                                fontWeight={"bold"}
                                display={"flex"}
                                sx={{ gridColumn: "span 4" }}
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
                                sx={{ gridColumn: "span 2" }}
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
                                sx={{ gridColumn: "span 2" }}
                              />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                              <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                sx={{ fontWeight: "bold" }}
                              >
                                Save change
                              </Button>
                            </Box>
                          </form>
                        )}
                      </Formik>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Profile;
