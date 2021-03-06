import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider, Field } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { createUser } from "../../../services/user.service";
import { LoadingButton } from "@mui/lab";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

toast.configure();
export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); //set state to showing password

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),//check username, password, email, firstname and lastname validity
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },//set initial values
    validationSchema: RegisterSchema,

    onSubmit: (values) => {
      const user = {
        user_name: values.firstname,
        user_surname: values.lastname,
        email: values.email,
        username: values.username,
        password: values.password,
        user_type: "user",
      };//set a user from form values
      createUser(user)//send user to backend to create user
        .then(function (response) {
          if (response.status === 200) { //if user is created
            navigate("/dashboard", { replace: true }); //navigate to dashboard
            toast.success(`${user.user_name} just registered`, {position: toast.POSITION.TOP_CENTER, hideProgressBar: true}); //show success message
          }
        }
        )
        .catch(function (error) {
          console.log(error); //if user is not created, show error message
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Field
              name="firstname"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  {...field}
                />
              )}
            ></Field>

            <Field
              name="lastname"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps("lastName")}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  {...field}
                />
              )}
            ></Field>
          </Stack>

          <Field
            name="email"
            render={({ field }) => (
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                {...field}
              />
            )}
          ></Field>

          <Field
            name="username"
            render={({ field }) => (
              <TextField
                fullWidth
                autoComplete="username"
                label="Username"
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                {...field}
              />
            )}
          ></Field>

          <Field
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                {...field}
              />
            )}
          ></Field>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
