import ProjectSlider from "../components/projectSlider/ProjectSlider";
import React from "react";

export default function ProjectsPage() {
  return (
    <div className="portfolio-page">
    <div className="page-header">
        <h2>TECH UPGRADES</h2>
        <p className="description">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>
        <div className="divider"></div>
        </div>
      <ProjectSlider />
    </div>
  );
}