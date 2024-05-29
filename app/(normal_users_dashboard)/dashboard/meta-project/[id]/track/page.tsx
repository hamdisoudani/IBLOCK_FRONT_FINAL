"use client";

import DisplayStudentsWorkspaceLiveUpdates from "@/components/meta-project/display_students_workspace_live_updates";
import { Button } from "@/components/ui/button";
import { UserProject } from "@/lib/types/general.types";
import axiosInstance from "@/plugins/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGrid, BsGrid3X2 } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TrackPage() {
    const params = useParams();
    const [projects, setProjects] = useState<UserProject[]>([]);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const handleCardsPerPageChange = (number:number) => {
      setCardsPerPage(number);
      setCurrentPage(0); // Reset to first page whenever cards per page changes.
    };

    const handlePrevPage = () => {
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
      if ((currentPage + 1) * cardsPerPage < projects.length) setCurrentPage(currentPage + 1);
    };
    const displayCards = () => {
      const start = currentPage * cardsPerPage;
      const end = Math.min(start + cardsPerPage, projects.length);
      const cards: any = [];
  
      projects.map((project, index) => {
        cards.push(
          <DisplayStudentsWorkspaceLiveUpdates key={index} project={project}  />
        );
      });
  
      return cards;
    };
    const gridClasses = () => {
      if (cardsPerPage === 4) return "grid grid-cols-2 grid-rows-2 gap-4 h-full";
      if (cardsPerPage === 6) return "grid grid-cols-3 grid-rows-2 gap-4 h-full";
      
    };

    useEffect(() => {
        const getAllProjectsUnderThisMetaProject = async () => {
            try {
              const response = await axiosInstance.get(`/mp/${params.id}/child-projects`);
              if(response.data.projects) {
                setProjects(response.data.projects);
              }
            } catch (error) {
                console.error(error);
            } finally {
              setLoadingProjects(false);
            }
        };
        getAllProjectsUnderThisMetaProject();
    } , []);
  return (
    <>
      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outline" onClick={() => handleCardsPerPageChange(4)}>
          <BsGrid  className="w-5 h-5 mr-2" />
          4
        </Button>
        <Button variant="outline" onClick={() => handleCardsPerPageChange(6)}>
          <BsGrid3X2 className="w-5 h-5 mr-2" />
          6
        </Button>
        
      </div>
      <div className=''>
        <div className={`${gridClasses()} h-[calc(100vh-150px)]`}>
          {displayCards()}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" onClick={handlePrevPage}>
            <FaArrowLeft  className="w-5 h-5 mr-2" />
            previous 
          </Button>
          <Button variant="outline" onClick={handleNextPage}>
            next 
            <FaArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}