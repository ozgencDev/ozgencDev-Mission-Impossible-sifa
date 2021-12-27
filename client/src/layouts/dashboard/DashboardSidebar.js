import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from "@mui/material";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig from "./SidebarConfig";
import account from "../../_mocks_/account";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user) {
    setUserName(user.name + " " + user.surname);
    setEmail(user.email);
    setUser(user);
  }
  }, [userName, email, user]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

  const isAdmin = (name) => {
    if (user && user.user_type === "admin") {
      return name;
    }
    return "";
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": { height: "100%", display: "flex", flexDirection: "column" }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {userName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={[
          {
            title: "dashboard",
            path: "/dashboard/app",
            icon: getIcon(pieChart2Fill)
          },
          {
            title: isAdmin("User List"),
            path: isAdmin("/dashboard/user"),
            icon: isAdmin(getIcon(peopleFill))
          }
        ]}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default"
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
