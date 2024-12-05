import React from "react";

type Props = {};

function QuickLinks({}: Props) {
  return (
    <div className="flex flex-col gap-7 bg-white rounded-xl border p-5 w-1/4 h-fit sticky top-0">
      <h2 className="font-semibold text-lg">Quick Links</h2>
      <div className="flex flex-col px-2 gap-7 text-sm font-medium">
        <a href="#academinc-info" className="flex items-center justify-between">
          Academinc Info
        </a>
        <a
          href="#employment-info"
          className="flex items-center justify-between"
        >
          Employment Info
        </a>
        <a href="#skill-info">Skill Info</a>
        {/* <a href="#Projects">Projects</a> */}
      </div>
    </div>
  );
}

export default QuickLinks;
