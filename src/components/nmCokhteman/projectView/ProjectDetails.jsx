import React from "react";

const ProjectDetails = ({ project }) => {
  if (!project) {
    return (
      <div >
        هیچ پروژه‌ای انتخاب نشده است.
      </div>
    );
  }

  return (
    <div >
      <h3 >جزئیات پروژه</h3>
      <div >
        <div>
          <span >کد پروژه:</span> {project.projectCode}
        </div>
        <div>
          <span >مالک:</span> {project.ownerName}
        </div>
        <div>
          <span >آدرس:</span> {project.address}
        </div>
        <div>
          <span >مختصات جهانی:</span>{" "}
          {project.globalCoords || "ثبت نشده"}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
