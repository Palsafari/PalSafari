import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const [state, setState] = useState("Log In"); // "Log In", "Create Account", or "Forgot Password"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "Forgot Password") {
      console.log("Send password recovery to:", email);
      alert("Recovery link sent (mock). You can now go back to login.");
      setState("Log In");
    } else {
      console.log({ email, password, firstName, lastName });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md sm:max-w-lg bg-gray-100 p-6 sm:p-8 rounded-xl border shadow-lg text-tertiary text-sm space-y-4">
        {/* Title */}
        <p className="text-2xl font-semibold text-center">
          {state === "Log In"
            ? t("logInBtn")
            : state === "Forgot Password"
            ? t("forgotPasswordTitle")
            : t("createTitle")}
        </p>

        {/* Message */}
        <p className="text-xs sm:text-sm text-gray-600">
          {state === "Log In"
            ? t("loginMessage")
            : state === "Forgot Password"
            ? t("forgotPasswordMessage")
            : t("createMessage")}
        </p>

        {/* First/Last Name for Create Account */}
        {state === "Create Account" && (
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <p className="text-xs">{t("firstName")}</p>
              <input
                className="w-full border border-zinc-300 rounded p-2 mt-1"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="flex-1">
              <p className="text-xs">{t("lastName")}</p>
              <input
                className="w-full border border-zinc-300 rounded p-2 mt-1"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        )}

        {/* Email field (always shown) */}
        <div className="w-full">
          <p className="text-xs">{t("email")}</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password (not shown on Forgot Password) */}
        {state !== "Forgot Password" && (
          <div className="w-full">
            <p className="text-xs">{t("password")}</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="mt-2.5 bg-primary text-white w-full py-2 rounded-md transition-transform text-base hover:bg-primary2 hover:scale-105"
        >
          {state === "Log In"
            ? t("logInBtn")
            : state === "Forgot Password"
            ? t("resetPasswordBtn")
            : t("createButton")}
        </button>

        {/* Terms of Service text under Create Account button */}
        {state === "Create Account" && (
          <p className="text-[10px] text-center text-gray-500 leading-snug">
            {t("createAccountToS")}{" "}
            <a
              href="/terms-of-service"
              className="text-blue-500 hover:underline"
            >
              {t("termsOfService")}
            </a>
            .
          </p>
        )}

        {/* Footer options */}
        {state === "Log In" && (
          <>
            <p className="text-center text-xs mt-2">
              {t("noAccount")}{" "}
              <span
                onClick={() => setState("Create Account")}
                className="text-primary cursor-pointer hover:text-primary2"
              >
                {t("createHere")}
              </span>
            </p>
            <p className="text-center text-xs">
              <span
                onClick={() => setState("Forgot Password")}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              >
                {t("forgotPasswordLink")}
              </span>
            </p>
          </>
        )}

        {state === "Create Account" && (
          <p className="text-center text-xs mt-2">
            {t("haveAccount")}{" "}
            <span
              onClick={() => setState("Log In")}
              className="text-primary cursor-pointer hover:text-primary2"
            >
              {t("loginHere")}
            </span>
          </p>
        )}

        {state === "Forgot Password" && (
          <p className="text-center text-xs mt-2">
            {t("rememberPassword")}{" "}
            <span
              onClick={() => setState("Log In")}
              className="text-primary cursor-pointer hover:text-primary2"
            >
              {t("loginHere")}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default LogIn;
