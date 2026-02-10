import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SimpleHeader() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          backgroundColor: "#5e35b1",
          justifyContent: "center",
          gap: "1rem",
          display: { sm: "flex", xs: "none" },
        }}
      >
        <Button color="inherit" href="/">
          postgres
        </Button>
        <Button color="inherit" href="/#/form">
          Форма
        </Button>
        <Button color="inherit" href="/#/response">
          Ответы
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleHeader;
