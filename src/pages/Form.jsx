import React from "react";
import { Container, Box, Typography } from "@mui/material";
import "@fontsource/roboto";

function Form() {
  const form = 
  `
    import { Box, TextField, Button } from "@mui/material";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
            "http://127.0.0.1:1337/api/auth/local/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            },
        );

        const result = await response.json();

        if (response.ok) {

            localStorage.setItem("token", result.jwt);

            alert("Регистрация успешна!");
            console.log("Токен сохранен:", result.jwt);

            window.location.href = "/";
        } else {
            // Обработка ошибок от сервера (например, "email уже занят")
            alert(result.error?.message || "Ошибка при регистрации");
    }
  } catch (error) {
    console.error("Ошибка сети:", error);
  }
};

function register() {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        name="username"
        label="Логин"
        type="text"
        required
        fullWidth
      ></TextField>
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        fullWidth
      ></TextField>
      <TextField
        name="password"
        label="Пароль"
        type="password"
        required
        fullWidth
      ></TextField>
      <Button type="submit" variant="contained">
        Отправить
      </Button>
    </Box>
  );
}

export default register;
 
  `;

  return (
    <Container>
      <Box margin="2rem 0">
        <Typography>
          Рабочий пример для отправки формы на сервер
        </Typography>

        <Box
          component="pre"
          sx={{
            fontSize: "12pt",
            fontFamily: "monospace",
            backgroundColor: "grey.800",
            color: "grey.50",
            p: 2,
            borderRadius: 1,
            overflowX: "auto",

            my: 2,
          }}
        >
          <code>{form}</code>
        </Box>
      </Box>
    </Container>
  );
}

export default Form;
