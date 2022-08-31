import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import { fetchRegister } from "../../api";
import "./style.sass";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../configuration";
import { RegisterFormProp } from "./types";
import { selectUser } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUpdateUser } from "../../api/updateUserRequest";
import { updateUserDataAction } from "../../store/slices/user";

export function RegisterFormComponent({ page }: RegisterFormProp) {
  const { email } = useAppSelector(selectUser);

  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const emailInInit = page === "register" ? "" : String(email);
  const [emailIn, setEmailIn] = useState(emailInInit);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function validationOutsideOfForm(): boolean {
    if (page === "register" && username.length < 3) {
      toast("Please, provide valid username.");
      return false;
    }
    if (
      emailIn.length < 6 ||
      !emailIn.match(EMAIL_PATTERN) ||
      !password1.match(PASSWORD_PATTERN)
    ) {
      toast("Please, fill out all required fields.");
      return false;
    }
    if (password1 !== password2) {
      toast("Passwords do not match. Try again!");
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    if (validationOutsideOfForm()) {
      if (page === "register") {
        const body = { username, email: emailIn, password: password1 };
        fetchRegister(body)
          .then((res) => {
            if (res.success) {
              navigate("/");
              toast(res.success);
            }
          })
          .catch((err) => {
            toast(err.message);
          });
      }
      if (page === "profile") {
        const body = { email: emailIn, password: password1 };
        fetchUpdateUser(body)
          .then((res) => {
            if (res.success) {
              dispatch(updateUserDataAction(emailIn));
              navigate("/dashboard");
              toast(res.success);
            }
          })
          .catch((err) => {
            toast(err.message);
          });
      }
    }
  };

  return (
    <div className="register-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {page === "register" && (
          <Form.Control
            required
            minLength={3}
            type="text"
            placeholder="username"
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
        )}
        <Form.Control.Feedback type="invalid">
          Username has to be at least 3 characters long
        </Form.Control.Feedback>
        <Form.Control
          required
          minLength={6}
          pattern={EMAIL_PATTERN}
          type="text"
          placeholder={email}
          value={emailIn}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmailIn(event.target.value)
          }
        />
        <Form.Control.Feedback type="invalid">
          Please, provide valid email address
        </Form.Control.Feedback>
        <Form.Control
          required
          pattern={PASSWORD_PATTERN}
          type="password"
          placeholder="password"
          value={password1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword1(event.target.value)
          }
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 8 characters long and contain a number,
          special character and capital letter
        </Form.Control.Feedback>
        <Form.Control
          required
          pattern={PASSWORD_PATTERN}
          type="password"
          placeholder="confirm your password"
          value={password2}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword2(event.target.value)
          }
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 8 characters long and contain a number,
          special character and capital letter
        </Form.Control.Feedback>
        {page === "register" && <Button type="submit">REGISTER</Button>}
        {page === "profile" && <Button type="submit">UPDATE</Button>}
      </Form>
    </div>
  );
}
