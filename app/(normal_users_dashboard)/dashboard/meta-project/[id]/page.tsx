"use client";


import ProjectNotFound from "@/components/errors/project_not_found";
import { DisplayMetaProjectInformationsAsOwner } from "@/components/meta-project/display_mp_information_as_owner";
import { MetaProject } from "@/lib/types/general.types";
import axiosInstance from "@/plugins/axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function MetaProjectDashboard() {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [metaProject, setMetaProject] = useState<MetaProject | null>(null);
    const [viewAs, setViewAs] = useState<'owner' | 'student'>('owner');

    useEffect(() => {
        const getMetaProjectInformation = async () => {
            try {
                const response = await axiosInstance.get(`/mp/${id}`)
                console.log(response.data);
                setMetaProject(response.data.metaProjectDetails);
                setViewAs(response.data.viewAs || 'student');
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getMetaProjectInformation();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <ProjectNotFound message="Sorry but this project was not found or you don't have permission to see this project" />
    }
    return (
        <div>
            {viewAs === 'owner' ? (
                <DisplayMetaProjectInformationsAsOwner metaProject={metaProject!} setMetaProject={setMetaProject} />
            ): (
                <ProjectNotFound message="Sorry but this project was not found or you don't have permission to see this project" />
                
            )}
        </div>
        
    )
}