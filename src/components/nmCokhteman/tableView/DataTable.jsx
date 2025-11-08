import React, { useState, useEffect } from "react";
import { getAllRecords } from "../../../data/indexedDBNCokhteman";

const DataTable = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getAllRecords("projects_details").then((data) => {
      setProjects(data || []);
    });
  }, []);

  if (!projects || projects.length === 0) {
    return <p>داده‌ای برای نمایش وجود ندارد.</p>;
  }

  const columns = Object.keys(projects[0]);

  const filteredProjects = projects.filter((project) =>
    Object.values(project)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* <h2>نمایش داده‌ها</h2> */}

      {/* 🔍 جستجو */}
      <input
        type="text"
        placeholder="جستجو در تمام فیلدها..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 🧭 جدول */}
      <div>
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, i) => (
              <tr
                key={i}
                onClick={() => {
                  setSelectedProject(project);
                  onSelectProject && onSelectProject(project);
                }}
              >
                {columns.map((col, j) => (
                  <td key={j}>{project[col] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
