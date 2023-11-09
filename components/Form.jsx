import { useRouter } from "next/router";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate-400 rounded"
        />

        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate-400 rounded"
        />

        <label>Password</label>
        <input
          type="text"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate-400 rounded"
        />

        <input
          type="submit"
          value="Create User"
          className="bg-blue-300 hover:bg-blue-100"
        />
      </form>

      <p className="text-red-400">{errorMessage}</p>
    </div>
  );
};

export default UserForm;
