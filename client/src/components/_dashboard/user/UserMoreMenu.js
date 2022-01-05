import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import {
  TextField,
  IconButton,
  Modal,
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { updateUserById } from "../../../services/user.service";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export default function UserMoreMenu({ user, deleteUser, updateUser }) { //get props
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false); //set state to showing modal
  const [isModalOpen, setModalOpen] = useState(false); //set state to modal

  const handleOpen = () => setModalOpen(true); //open modal
  const handleClose = () => setModalOpen(false);  //close modal

  const UpdateSchema = Yup.object().shape({
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
    username: Yup.string().required("Username is required"),  //check username, email, firstname and lastname validity
  });

  const formik = useFormik({
    initialValues: {
      firstname: user.user_name,
      lastname: user.user_surname,
      email: user.email,
      username: user.username,
    },//set initial values
    validationSchema: UpdateSchema,
    onSubmit: (values) => {
      let newUser = {
        user_name: values.firstname,
        user_surname: values.lastname,
        email: values.email,
        username: values.username,
      };//set a user from form values
      updateUserById(user.id, newUser) //send user to backend to update user
        .then(function (response) {
          if (response.status === 200) { //if user is updated
            updateUser(
              user.id,
              values.username,
              values.firstname,
              values.lastname,
              user.password,
              values.email
            ); //update user in state
            handleClose(); //close modal
            values.firstname = user.user_name;
            values.lastname = user.user_surname;
            values.email = user.email;
            values.username = user.username; //set form values to user values
          }
          updatePopup(user.user_name); //show popup
        })
        .catch(function (error) {
          console.log(error); //if user is not updated, show error message
        });
    },
  });

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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const deletePopup = (user) => {
    toast.warning(`${user} just deleted`, {position: toast.POSITION.TOP_CENTER, hideProgressBar: true});
  }

  const updatePopup = (user) => {
    toast.success(`${user} just updated`, {position: toast.POSITION.TOP_CENTER, hideProgressBar: true});
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => {
            deleteUser(user.id);
            deletePopup(user.user_name);
          }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem sx={{ color: "text.secondary" }} onClick={handleOpen}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Modal
          style={{ left: "30%", top: "10%" }}
          sx={{ mb: 5 }}
          open={isModalOpen}
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
                      type="email"
                      label="Email address"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      {...field}
                    />
                  )}
                ></Field>

                <Field
                  name="username"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Username"
                      {...getFieldProps("username")}
                      error={Boolean(touched.username && errors.username)}
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
                  Update
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Modal>
      </Menu>
    </>
  );
}
