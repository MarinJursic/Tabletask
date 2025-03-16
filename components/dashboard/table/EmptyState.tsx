import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  view: string;
}

const EmptyState = ({ view }: EmptyStateProps) => {
  const isContentView = view === "content";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="300px"
      color="text.secondary"
    >
      <Typography variant="h6" fontWeight="bold">
        {isContentView ? "No content found" : "No trends found"}
      </Typography>
      <Typography variant="body2">
        {isContentView
          ? "You currently have no content to display"
          : "Nothing is currently trending"}
      </Typography>
    </Box>
  );
};

export default EmptyState;
