import Image from "next/image";
import React from "react";
import { Box, Typography } from "@mui/material";
import { ContentItem } from "@/utils/validation";
import userAvatar from "@/public/user-avatar.png";

function NameColumn(item: ContentItem) {
  const avatarUrl = item.avatarUrl ? item.avatarUrl : userAvatar; // ✅ Default image

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "40px", height: "40px", marginRight: "16px" }}>
        <Image
          src={avatarUrl}
          alt={item.name + " logo"}
          className="rounded-lg w-full h-full"
          priority
          width={40}
          height={40}
        />
      </Box>

      <Typography variant="body2">{item.name}</Typography>
    </Box>
  );
}

export default NameColumn;
