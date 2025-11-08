import React, { useState, useEffect } from "react";
import DataTable from "./TableView/DataTable";
import MapView from "./MapView/MapView";
// import ProjectDetails from "../CompNCokhteman/ProjectView/ProjectDetails";
import DataManagement from "./DataManager/DataManagement"; // اگر داری استفاده‌ش کن
import { getAllRecords } from "./PublicComponent/indexedDBNCokhteman";
import { Button, Box, Paper, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
// import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import "./ProjectNezamSakhteman.css";
import { blue } from "@mui/material/colors";

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
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ background: "#90caf9", height: 100 }}>Box 1</div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ background: "#81c784", height: 100 }}>Box 2</div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ background: "#ffb74d", height: 100 }}>Box 3</div>
        </Grid>
      </Grid>

      {/* <div>
        <div>
          <div>
            <MapView projects={projects} selectedProject={selectedProject} />
          </div>
        </div>
      </div> */}
      {/* Table and Data management */}
      {/* <div>
        <div>
          <div>
            <DataTable
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <DataManagement
              projects={projects}
              setProjects={setProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default ProjectNezamSakhteman;
