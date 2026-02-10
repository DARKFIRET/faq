import React from "react";
import { Container, Box, Typography } from "@mui/material";
import '@fontsource/roboto'

function Postgre() {
  // Используем обратные кавычки (template literal) для сохранения отступов
  const dockerConfig = `version: '3.8'
services:
  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: example
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`;

  return (
    <Container>
      <Box margin="2rem 0">
        <Typography>
          Для создания контейнера postgres создайте конфиг в{" "}
          <code>docker-compose.yml</code>
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
          <code>{dockerConfig}</code>
        </Box>
      </Box>
    </Container>
  );
}

export default Postgre;
