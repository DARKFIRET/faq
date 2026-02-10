import React from "react";
import { Container, Box, Typography } from "@mui/material";
import "@fontsource/roboto";

function Data() {
  const data = `
    function UserProfileFetch() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Получаем токен из localStorage (предполагаем, что он там есть после логина)
    const token = localStorage.getItem('jwt');

    if (!token) {
      setError('JWT токен не найден. Пожалуйста, авторизуйтесь.');
      setLoading(false);
      return;
    }

    // 2. Выполняем fetch запрос
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/me?populate=*", {
          method: 'GET',
          headers: {
            'Authorization': "Bearer token",
            'Content-Type': 'application/json',
          },
        });

        // В fetch нужно вручную проверять статус ответа
        if (!response.ok) {
          throw new Error('Ошибка сервера: 'S{response.status} S{response.statusText}');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (...)
 
  `;

  return (
    <Container>
      <Box margin="2rem 0">
        <Typography>Логика для получения информации о пользователе</Typography>

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
          <code>{data}</code>
        </Box>
      </Box>
    </Container>
  );
}

export default Data;
