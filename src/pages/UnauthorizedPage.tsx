import React from "react";

type Props = {};

function UnauthorizedPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg"
        alt="unauthorized"
      />
    </div>
  );
}

export default UnauthorizedPage;
