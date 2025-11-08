import React, { useState, useEffect } from "react";
import DataTable from "./tableView/DataTable";
import MapView from "./mapView/MapView";
import DataManagement from "./dataManager/dataManagement"; // اگر داری استفاده‌ش کن
import { getAllRecords } from "../../data/indexedDBNCokhteman";
// import { Button, Box, Paper, Container } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const ProjectNezamSakhteman = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    Promise.all([
      getAllRecords("projects_details"),
      getAllRecords("projects_basic"),
    ])
      .then(([details, basics]) => {
        const basicByCode = new Map(
          (basics || []).map((b) => [b.projectCode, b])
        );
        const merged = (details || []).map((d) => {
          const b = basicByCode.get(d.projectCode) || {};
          return {
            ...b,
            ...d,
            globalCoords: d.globalCoords || b.globalCoords || "",
          };
        });

        setProjects(merged);
      })
      .catch((error) => {
        console.log("❌ خطا در دریافت داده‌ها:", error);
        setProjects([]);
      });
  }, []);

  return (
    <div>
      <div>
        <MapView projects={projects} selectedProject={selectedProject} />
      </div>
      <div>
        <DataTable
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />
      </div>
      <div>
        <DataManagement
          projects={projects}
          setProjects={setProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default ProjectNezamSakhteman;
