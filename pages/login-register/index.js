import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/login-register.module.css";
import { authTypes } from "@/utils/constants";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

function LoginRegister() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <>
      <Head>
        <title>
          {authType === authTypes.LOGIN
            ? "Login - Ali Store"
            : "Register - Ali Store"}
        </title>
        <meta
          name="description"
          content={
            authType === authTypes.LOGIN
              ? "Login to your Ali Store account to manage your preferences and orders."
              : "Register a new account on Ali Store to enjoy a personalized shopping experience."
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={
            authType === authTypes.LOGIN
              ? "Login - Ali Store"
              : "Register - Ali Store"
          }
        />
        <meta
          property="og:description"
          content={
            authType === authTypes.LOGIN
              ? "Login to your Ali Store account to manage your preferences and orders."
              : "Register a new account on Ali Store to enjoy a personalized shopping experience."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://alistore.liara.run/login-register`}
        />
        <meta
          property="og:image"
          content={`https://alistore.liara.run/images/login-register-og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://alistore.liara.run/login-register`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "url": "https://alistore.liara.run/login-register",
              "name": "${
                authType === authTypes.LOGIN
                  ? "Login - Ali Store"
                  : "Register - Ali Store"
              }",
              "description": "${
                authType === authTypes.LOGIN
                  ? "Login to your Ali Store account to manage your preferences and orders."
                  : "Register a new account on Ali Store to enjoy a personalized shopping experience."
              }",
              "publisher": {
                "@type": "Organization",
                "name": "Ali Store"
              }
            }
          `}
        </script>
      </Head>
      <div className={styles.login_register}>
        <div className={styles.form_bg} data-aos="fade-up">
          {authType === authTypes.LOGIN ? (
            <Login showRegisterForm={showRegisterForm} />
          ) : (
            <Register showloginForm={showloginForm} />
          )}
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
