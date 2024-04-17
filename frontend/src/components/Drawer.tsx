import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/Book";
import DoneIcon from "@mui/icons-material/Done";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography } from "@mui/material";
import TextFieldSearch from "./TextFieldSearch";
import ProfileInfoButton from "./ProfileInfoButton";
import { Directions } from "@mui/icons-material";
import { useState } from "react";
import DrawerFilterTab from "./DrawerFilterTab";

interface LeftPermanentDrawerProps {
  drawerWidth: string;
  color: string;
  textColor: string;
  fontSize: string;
  dividerColor: string;
  onSetFilter: (type: string) => void;
  onSetTags: (tag: string) => void;
  tags: string[];
}

export default function LeftPermanentDrawer({
  drawerWidth,
  color,
  textColor,
  fontSize = "1rem",
  dividerColor = "#3b3835",
  onSetFilter,
  onSetTags,
}: LeftPermanentDrawerProps) {
  // only one active filter tab at same time
  const [activeFilterTab, setActiveFilterTab] = useState("");

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          color: "white",
          backgroundColor: color,
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Toolbar sx={{ my: "1rem" }}>
          <ForumIcon sx={{ mr: fontSize }} />
          <Typography align="center" sx={{ fontWeight: "bold" }} variant="h4">
            Tasks
          </Typography>
        </Toolbar>
        <List sx={{ mb: "1rem", width: "100%" }}>
          <DrawerFilterTab
            onSetActiveFilterTab={setActiveFilterTab}
            onSetFilter={onSetFilter}
            currentFilterTab={activeFilterTab}
            value={"home"}
            label="Home"
            textColor={textColor}
            fontSize={fontSize}
            pressedColor="black"
          >
            {<Person2Icon />}
          </DrawerFilterTab>
          <DrawerFilterTab
            onSetActiveFilterTab={setActiveFilterTab}
            onSetFilter={onSetFilter}
            currentFilterTab={activeFilterTab}
            value={"completed"}
            label="Completed"
            textColor={textColor}
            fontSize={fontSize}
            pressedColor="black"
          >
            {<BookIcon />}
          </DrawerFilterTab>
          <DrawerFilterTab
            label="Upcoming"
            value="upcoming"
            onSetActiveFilterTab={setActiveFilterTab}
            onSetFilter={onSetFilter}
            currentFilterTab={activeFilterTab}
            textColor={textColor}
            fontSize={fontSize}
            pressedColor="black"
          >
            {<DoneIcon />}
          </DrawerFilterTab>
        </List>
        <TextFieldSearch
          additionalProperties={{ mx: "auto" }}
          label="Tags"
          width={"85%"}
          color="white"
          borderRadius={"100px"}
          bgColor={"black"}
          onSetTags={onSetTags}
        />

        <Divider
          sx={{ mt: "1.5rem", borderColor: dividerColor, width: "85%" }}
          variant="middle"
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "start",
        }}
      >
        <ProfileInfoButton
          bgColor={"black"}
          color={"white"}
          fontSizeProfileText={"1rem"}
          fontSizeSubtitle={".8rem"}
          width={"85%"}
          additionalProperties={{ mx: "auto", borderRadius: "100px" }}
        />
        <Divider
          sx={{ mt: "1.5rem", borderColor: dividerColor, width: "85%" }}
          variant="middle"
        />
        <List sx={{ width: "100%" }}>
          {["Settings", "Sign Out"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: textColor }}>
                  {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ fontSize: fontSize }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
