import { isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import { NotFoundIcon, OopsIcons } from "../assets/Icons/ErrorPageIcons";
import ErrorPage from "./layouts/ErrorPage";

export default function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        icon={NotFoundIcon}
        title="Oops, page not found"
        content="It seems the page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track!"
        top="2rem"
      />
    );
  } else if (error instanceof Error) {
    return (
      <ErrorPage
        icon={OopsIcons}
        title="Something went wrong."
        content="We're unable to load the page at the moment. Please try refreshing or come back later."
        top="-5rem"
      />
    );
  } else {
    return (
      <ErrorPage
        icon={OopsIcons}
        title="Something went wrong."
        content="We're unable to load the page at the moment. Please try refreshing or come back later."
        top="-5rem"
      />
    );
  }
}
