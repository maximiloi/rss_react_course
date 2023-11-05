import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

import './style.scss';

function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="error__page">
      <h1>👾 Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Link to="/">Home Page</Link>
    </div>
  );
}

export default ErrorPage;
