import React from "react";

type Props = {};

function NotFoundPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://cdn.dribbble.com/users/761395/screenshots/6168098/media/d3b2e276b1fb48c922a959816c993a21.jpg"
        alt="not-found"
      />
    </div>
  );
}

export default NotFoundPage;
