import React from "react";

type Props = {};

function QuickLinks({}: Props) {
  return (
    <div className="flex flex-col gap-7 bg-white rounded-xl border p-5 w-1/4 h-fit sticky top-0">
      <h2 className="font-semibold text-lg">Quick Links</h2>
      <div className="flex flex-col px-2 gap-7 text-sm font-medium">
        <a href="#Resume" className="flex items-center justify-between">
          Resume {/* {hasAccess && ( */}
          <span className="font-semibold text-blue-700">Update</span>
          {/* )} */}
        </a>
        <a href="#Resume-headline">Resume headline</a>
        <a href="#Employment" className="flex items-center justify-between">
          Employment {/* {hasAccess && ( */}
          <span className="font-semibold text-blue-700">Add</span>
          {/* )} */}
        </a>
        <a href="#Education" className="flex items-center justify-between">
          Education {/* {hasAccess && ( */}
          <span className="font-semibold text-blue-700">Add</span>
          {/* )} */}
        </a>
        <a href="#IT-skills">IT skills</a>
        <a href="#Projects">Projects</a>
        <a href="#Career-profile">Career profile</a>
        <a href="#Personal-details">Personal details</a>
      </div>
    </div>
  );
}

export default QuickLinks;
