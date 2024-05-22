"use client";

import DisplayStudentsWorkspaceLiveUpdates from "@/components/meta-project/display_students_workspace_live_updates";
import { UserProject } from "@/lib/types/general.types";
import axiosInstance from "@/plugins/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrackPage() {
    const params = useParams();
    const [projects, setProjects] = useState<UserProject[]>([]);
    useEffect(() => {
        const getAllProjectsUnderThisMetaProject = async () => {
            try {
              const response = await axiosInstance.get(`/mp/${params.id}/child-projects`);
              if(response.data.projects) {
                setProjects(response.data.projects);
              }
            } catch (error) {
                console.error(error);
            }
        };
        getAllProjectsUnderThisMetaProject();
    } , []);
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <DisplayStudentsWorkspaceLiveUpdates project={project}  />
        </div>
        )
      )}
    </div>
  );
}