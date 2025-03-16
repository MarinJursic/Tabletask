import React from "react";
import { Box, Typography } from "@mui/material";

type SubHeaderTypes = {
  title: string;
  description: string;
};

const SubHeader = ({ title, description }: SubHeaderTypes) => {
  return (
    <Box sx={{ px: 12, pb: 3, borderBottom: "1px solid #e0e0e0" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

export default SubHeader;
