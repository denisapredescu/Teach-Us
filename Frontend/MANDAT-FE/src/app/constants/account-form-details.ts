interface SubmitButton {
  link: string;
  caption: string;
}

interface SubTitle {
  question: string;
  button: SubmitButton;
}

export interface AccountFormDetails {
  pageUrl: string;
  pageTitle: string;
  subTitle: SubTitle;
  submitButton: SubmitButton;
}

export const RegisterAccountFormDetails: AccountFormDetails = {
  pageUrl: "/register",
  pageTitle: "Get Started",
  subTitle: {
    question: "Already have an account?",
    button: {
      link: "/login",
      caption: "Login",
    },
  },
  submitButton: {
    link: "/home",
    caption: "Register",
  },
};

export const SettingsAccountFormDetails: AccountFormDetails = {
  pageUrl: "/settings",
  pageTitle: "Settings",
  subTitle: {
    question: "Changed your mind?",
    button: {
      link: "/user-profile",
      caption: "Go back",
    },
  },
  submitButton: {
    link: "/user-profile",
    caption: "Save Settings",
  },
};

export const ResetPasswordUserAccount: AccountFormDetails = {
  pageUrl: "/reset-password",
  pageTitle: "Reset Password",
  subTitle: {
    question: "Changed your mind?",
    button: {
      link: "/settings",
      caption: "Go back",
    },
  },
  submitButton: {
    link: "/settings",
    caption: "Reset password",
  },
};