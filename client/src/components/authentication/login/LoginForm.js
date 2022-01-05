import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); //set state to showing password
  const [error, setError] = useState(false); //set state to showing error message

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),//check username and password validity
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,//set initial values
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      axios
        .post("https://mission-alot.herokuapp.com/auth/login", {
          username: values.email,
          password: values.password,
        })//send data to backend to check if user is valid
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {//if user is valid
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data)); //store user data in local storage
            }
            navigate("/dashboard", { replace: true }); //navigate to dashboard
          }
        })
        .catch(function (error) {
          setError(true); //if user is invalid, show error message
        });
    },
  });

  const { errors, touched, handleSubmit} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show); //toggle show password
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Field
            name="email"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Username"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                {...field}
              />
            )}
          ></Field>

          <Field
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Alert
            style={error ? { opacity: 1 } : { opacity: 0 }}
            severity="error"
          >
            Username or password is invalid
          </Alert>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
