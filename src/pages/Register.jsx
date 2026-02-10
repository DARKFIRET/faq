import * as React from "react";
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  Stack,
} from "@mui/material";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // Данные формы храним в одном объекте
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  // Обработчик изменения для всех полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Функция сброса формы
  const handleReset = () => {
    setActiveStep(0);
    setFormData({ email: "", username: "", password: "" });
    setSkipped(new Set());
  };

  const renderstep = (step) => {
    // Используем Stack для отступов и Box вместо Typography
    switch (step) {
      case 0:
        return (
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        );
      case 1:
        return (
          <TextField
            fullWidth
            type="text"
            label="Username"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
        );
      case 2:
        return (
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        );
      default:
        return null;
    }
  };

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // Функция отправки данных на бэкенд
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Отправляем наш объект formData целиком
        },
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.jwt);
        alert("Регистрация успешна!");
        handleNext(); // Переходим к финальному экрану
        // window.location.href = "/"; // Раскомментируйте для редиректа
      } else {
        alert(result.error?.message || "Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Не удалось связаться с сервером");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Регистрация завершена!
            </Typography>
            <Button variant="contained" onClick={handleReset}>
              Начать заново
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            {/* Контент текущего шага */}
            <Box sx={{ minHeight: "120px", mb: 3 }}>
              {renderstep(activeStep)}
            </Box>

            {/* Кнопки навигации */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
