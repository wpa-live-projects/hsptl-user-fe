import React, { useState } from "react";

const RegisterPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("https://hsptl-user-be.onrender.com/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age, 10),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Server error");
      }

      setMessage("✅ Patient registered successfully!");
      setFormData({ name: "", age: "", gender: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="register-form" style={styles.container}>
      <h2>Register New Patient</h2>

      {message && <p style={{ color: "green", marginBottom: 10 }}>{message}</p>}
      {error && <p style={{ color: "red", marginBottom: 10 }}>❌ {error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Age:</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select --</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: 8,
    background: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default RegisterPatientForm;
