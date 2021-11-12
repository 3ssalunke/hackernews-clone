import { useQuery } from "@apollo/client";
import Router, { NextRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { IMeQuery, ME_QUERY } from "../src/data/queries/me-query";
import {
  getErrorMessageForLoginErrorCode,
  UserLoginErrorCode,
} from "../src/helpers/user-login-error-code";
import { withDataAndRouter } from "../src/helpers/withData";
import { BlankLayout } from "../src/layout/blank-layout";
import { validateNewUser } from "../src/model/user.validator";

export interface ILoginPageProps {
  router?: NextRouter;
}

function LoginPage(props: ILoginPageProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);
  const { router } = props;

  const [loginId, setLoginId] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerId, setRegisterId] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");

  const routerQuery = router?.query as {
    how: UserLoginErrorCode;
    goto: string;
  };
  const message = routerQuery.how
    ? getErrorMessageForLoginErrorCode(routerQuery.how)
    : undefined;

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router?.push("/login?how=loggedin");
    } else {
      try {
        validateNewUser({ id: loginId, password: loginPassword });
      } catch (error: any) {
        e.preventDefault();
        setValidationMessage(error.message);
      }
    }
  };

  const validateRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router?.push("/login?how=loggedin");
    } else {
      try {
        validateNewUser({ id: registerId, password: registerPassword });
      } catch (error: any) {
        e.preventDefault();
        setValidationMessage(error.message);
      }
    }
  };

  return (
    <BlankLayout>
      {message && <p>{message}</p>}
      {validationMessage && <p>{validationMessage}</p>}
      <b>Login</b>
      <br />
      <br />
      <form
        method="post"
        action="/login"
        onSubmit={(e) => validateLogin(e)}
        style={{ marginBottom: "1em" }}
      >
        <input type="hidden" name="goto" value={routerQuery.goto || "news"} />
        <table style={{ border: "0px" }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  autoCapitalize="off"
                  autoComplete="off"
                  name="id"
                  size={20}
                  type="text"
                  spellCheck="false"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLoginId(e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  name="password"
                  size={20}
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLoginPassword(e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="login" />
      </form>
      <Link href="/">
        <a>Forgot your password</a>
      </Link>
      <br />
      <br />
      <b>Create Account</b>
      <br />
      <br />
      <form
        method="post"
        style={{ marginBottom: "1em" }}
        action="/register"
        onSubmit={validateRegister}
      >
        <table style={{ border: "0px" }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  type="text"
                  name="id"
                  size={20}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterId(e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  size={20}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterPassword(e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="create account" />
      </form>
    </BlankLayout>
  );
}

export default withDataAndRouter(LoginPage);
