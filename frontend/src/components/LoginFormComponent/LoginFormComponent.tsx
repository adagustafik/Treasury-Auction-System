import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../store/hooks";
import { setupUserDataAction } from "../../store/slices/user";
import { fetchLogin } from "../../api";
import { PASSWORD_PATTERN } from "../../configuration";

export function LoginFormComponent() {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  function validationLogin(): boolean {
    if (username.length < 1 || password.length < 1) {
      toast("Please, fill out all required fields.");
      return false;
    }
    if (
      username.length < 3 ||
      password.length < 8 ||
      !password.match(PASSWORD_PATTERN)
    ) {
      toast("Please, provide valid username & password");
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    if (validationLogin()) {
      const body = { username, password };
      fetchLogin(body)
        .then((res) => {
          if (res.username) {
            dispatch(setupUserDataAction(res.username, res.admin, res.email));
            navigate("/dashboard");
            toast("You are logged in now");
          }
        })
        .catch((err) => {
          toast(err.message);
        });
    }
  };

  return (
    <div className="register-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
          required
          type="text"
          placeholder="username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
        />
        <Form.Control
          required
          type="password"
          placeholder="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        <Button type="submit">LOGIN</Button>
      </Form>
    </div>
  );
}
