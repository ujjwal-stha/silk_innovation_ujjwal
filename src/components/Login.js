import React, { useState, useEffect } from "react";

const Login = () => {
  const initialValues = { email: "", phone: "", password: "", pin: "" };
  const [formValues, setFormValues] = useState(initialValues);
  //const [userInput, setUserInput] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleUserChange = (e) => {
    //const { name, value } = e.target;
    //setFormValues({ ...formValues, [name]: value });
    const userInput = e.target.value;
    const isUser = validate(userInput);
    if (isUser) setFormValues({ ...formValues, email: userInput, phone: "" });
    else setFormValues({ ...formValues, phone: userInput, email: "" });
  };

  const handlePasswordChange = (e) => {
    const userInput = e.target.value;
    const isPassword = validate(userInput);
    if (isPassword)
      setFormValues({ ...formValues, password: userInput, pin: "" });
    else setFormValues({ ...formValues, pin: userInput, password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`http://103.235.198.52/api/login`, {
      method: "POST",
      headers: {
        "App-Authorizer": 647061697361,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email,
        phone: formValues.phone,
        password: formValues.password,
        pin: formValues.pin,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.access_token);
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      alert("Logged in  Successfully");
    } else {
      alert("Invaild Credentials");
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (
      values.email === formValues.email ||
      values.phone === formValues.phone
    ) {
      if (
        values.password === formValues.password ||
        values.pin === formValues.pin
      ) {
        console.log("user logged in");
      } else {
        console.log("Invalid data");
      }
    }

    if (!values.email || !values.phone) {
      errors.email = "Email  is required!";
      errors.phone = "Phone no is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (values.phone !== 10) {
      errors.phone = "The length should be 10 digits!";
    } else if (values.phone !== 984 || values.phone !== 986) {
      errors.phone = "The NTC prepaid should start with 984 or 986 digits!";
    } else if (values.phone !== 985) {
      errors.phone = "The NTC postpaid should start with 985 digits!";
    } else if (values.phone !== 974 || values.phone !== 975) {
      errors.phone = "The NTC CDMA should start with 974 or 975 digits!";
    } else if (
      values.phone !== 980 ||
      values.phone !== 981 ||
      values.phone !== 982
    ) {
      errors.phone = "The NCell should start with 980 or 981 or 982 digits!";
    } else if (values.phone !== 988 || values.phone !== 962) {
      errors.phone = "The SMARTCELL should start with 988 or 962";
    } else if (values.phone !== 972) {
      errors.phone = "The UTL should start with 972";
    }

    if (!values.password || !values.pin) {
      errors.password = "Password is required!";
      errors.pin = "pin is required";
    } else if (values.pin.length < 4) {
      errors.pin = "Pin must be more than 4 characters";
    } else if (values.password.length < 6) {
      errors.password = "Password  must be more than 6 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in Successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>

        <div className="ui form">
          <div className="field">
            <label>Email/Phone:</label>
            <input
              type="text"
              //name="email"
              placeholder="Email/Phone"
              value={formValues.email || formValues.phone}
              onChange={handleUserChange}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Password/Pin:</label>
            <input
              type="password"
              //name="password"
              placeholder="Password/Pin"
              value={formValues.password || formValues.pin}
              onChange={handlePasswordChange}
            />
          </div>
          <p>{formErrors.password}</p>

          <button className="fluid ui button blue">SignIn</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
