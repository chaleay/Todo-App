import { Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface ProfileInfoButtonProps {
  bgColor: string;
  color: string;
  fontSizeProfileText: string;
  fontSizeSubtitle: string;
  width: string;
  additionalProperties?: object;
}

export default function ProfileInfoButton({
  bgColor = "black",
  color = "white",
  fontSizeProfileText = "1rem",
  fontSizeSubtitle = ".8rem",
  width = "75%",
  additionalProperties,
}: ProfileInfoButtonProps) {
  return (
    <Button
      sx={{
        width,
        backgroundColor: bgColor,
        color: color,
        justifyContent: "space-around",
        ...additionalProperties,
      }}
      variant="contained"
      startIcon={<PersonIcon />}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          textTransform: "none",
        }}
      >
        <Typography fontSize={fontSizeProfileText}>User Profile</Typography>
        <Typography fontSize={fontSizeSubtitle}>example@email.com</Typography>
      </Box>
    </Button>
  );
}
