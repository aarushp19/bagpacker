import React, { useState } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://127.0.0.1:8000/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Registration failed");
        }

        localStorage.setItem("accessToken", data.access);
        console.log("Registration successful", data);

        setSubmitted(true);
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setApiError(error.message);
      }
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  // Cyberpunk Styling ⚡
  const styles = {
    container: {
      maxWidth: "450px",
      margin: "40px auto",
      padding: "30px",
      background: "#0d0d0d",
      borderRadius: "10px",
      boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.7)",
      textAlign: "center",
      fontFamily: "'Orbitron', sans-serif",
      color: "#0ff",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #0ff",
      background: "#1a1a1a",
      color: "#0ff",
      fontSize: "16px",
      fontFamily: "'Orbitron', sans-serif",
      outline: "none",
      boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
      transition: "0.3s",
    },
    inputFocus: {
      border: "1px solid #f0f",
      boxShadow: "0px 0px 15px rgba(255, 0, 255, 0.7)",
    },
    button: {
      width: "100%",
      padding: "14px",
      marginTop: "12px",
      background: "linear-gradient(90deg, #ff00ff, #00ffff)",
      color: "#0d0d0d",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontFamily: "'Orbitron', sans-serif",
      textTransform: "uppercase",
      transition: "0.3s",
    },
    buttonHover: {
      boxShadow: "0px 0px 15px rgba(255, 0, 255, 0.8), 0px 0px 15px rgba(0, 255, 255, 0.8)",
      transform: "scale(1.05)",
    },
    errorText: {
      color: "#ff007f",
      fontSize: "14px",
      margin: "5px 0",
    },
    successText: {
      color: "#00ff00",
      fontSize: "16px",
      marginBottom: "10px",
    },
    glitchEffect: {
      animation: "glitch 1s infinite alternate",
    },
    "@keyframes glitch": {
      "0%": { textShadow: "2px 2px 0px #ff00ff" },
      "50%": { textShadow: "-2px -2px 0px #00ffff" },
      "100%": { textShadow: "2px 2px 0px #ff00ff" },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.glitchEffect}>REGISTRATION</h2>
      {submitted && <p style={styles.successText}>✅ Registration Successful! ✅</p>}
      {apiError && <p style={styles.errorText}>⚠️ {apiError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.username && <p style={styles.errorText}>{errors.username}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style = { ...styles.button, ...styles.buttonHover })}
          onMouseOut={(e) => (e.target.style = styles.button)}
        >
          🔥 Register Now 🔥
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
