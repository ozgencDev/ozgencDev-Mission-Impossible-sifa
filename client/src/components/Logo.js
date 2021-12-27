import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <div style={{ paddingLeft: 48 }}>
      <Box component="img" src="/static/logo.png" sx={{ width: 150, height: 25, ...sx }} />
    </div>
  );
}
