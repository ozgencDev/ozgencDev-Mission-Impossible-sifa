import { useState, useEffect } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Typography,
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
import { useFormik, Form, FormikProvider, Field } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  getUserBoard,
  createUser,
  deleteUserById,
} from "../services/user.service.js";
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "type", label: "Role", alignRight: false },
  { id: "" },
];

export default function User() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getUserBoard();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    minHeight: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const user = {
        user_name: values.firstname,
        user_surname: values.lastname,
        email: values.email,
        username: values.username,
        password: values.password,
        user_type: "User",
      };
      createUser(user)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            handleClose();
            values.firstname = "";
            values.lastname = "";
            values.email = "";
            values.username = "";
            values.password = "";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const deleteUser = async (id) => {
    await deleteUserById(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, username, name, surname, password, email) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              username: username,
              user_name: name,
              user_surname: surname,
              password: password,
              email: email,
            }
          : user
      )
    );
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleOpen}
          >
            New User
          </Button>
          <Modal
            style={{ left: "30%", top: "10%" }}
            sx={{ mb: 5 }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <FormikProvider value={formik} sx={style}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                style={{
                  background: "white",
                  width: "60%",
                  height: "70%",
                  padding: 48,
                }}
              >
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
                        autoComplete="email"
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
                                <Icon
                                  icon={showPassword ? eyeFill : eyeOffFill}
                                />
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
                    Add
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={4}
                />

                <TableBody>
                  {users &&
                    users.map((user) => {
                      return (
                        <TableRow
                          hover
                          key={user.id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography
                                variant="subtitle2"
                                noWrap
                                style={{ paddingLeft: 16 }}
                              >
                                {user.user_name}
                                {" " + user.user_surname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{user.email}</TableCell>
                          <TableCell align="left">
                            {user.user_type === "admin" ? "admin" : "user"}
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              user={user}
                              deleteUser={deleteUser}
                              updateUser={updateUser}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>
    </Page>
  );
}
