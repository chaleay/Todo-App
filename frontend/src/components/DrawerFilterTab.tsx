import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface DrawerFilterTabProps {
  onSetActiveFilterTab: (s: string) => void;
  onSetFilter: (s: string) => void;
  currentFilterTab: string;
  value: string;
  label: string;
  textColor: string;
  fontSize: string;
  children: React.ReactNode;
  pressedColor: string;
}

export default function DrawerFilterTab({
  value,
  label,
  textColor,
  fontSize,
  children,
  onSetFilter,
  onSetActiveFilterTab,
  currentFilterTab,
  pressedColor,
}: DrawerFilterTabProps) {
  // 2 things.
  //1. adjust filter state (in app)
  //2. adjust the active filter tab state
  function handleSetNewActiveFilterTab(filterType: string) {
    if (filterType != currentFilterTab) {
      onSetFilter(filterType);
      onSetActiveFilterTab(filterType);
    } else {
      onSetFilter("");
      onSetActiveFilterTab("");
    }
  }

  return (
    <>
      <ListItem key={value} disablePadding>
        <ListItemButton
          sx={{
            backgroundColor:
              currentFilterTab === value ? pressedColor : "inherit",
          }}
          onClick={() => handleSetNewActiveFilterTab(value)}
        >
          <ListItemIcon sx={{ color: textColor }}>{children}</ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ fontSize: fontSize }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
