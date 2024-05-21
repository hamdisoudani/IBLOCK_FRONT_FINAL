"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { BlocklyWorkspace } from 'react-blockly';
import { BsGrid , BsGrid3X2 } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const totalCards = 20; // Suppose we have a total of 20 cards for demonstration.

export default function Component() {
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCardsPerPageChange = (number:number) => {
    setCardsPerPage(number);
    setCurrentPage(0); // Reset to first page whenever cards per page changes.
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * cardsPerPage < totalCards) setCurrentPage(currentPage + 1);
  };

  const displayCards = () => {
    const start = currentPage * cardsPerPage;
    const end = Math.min(start + cardsPerPage, totalCards);
    const cards = [];

    for (let i = start; i < end; i++) {
      cards.push(
        <Card key={i} className="flex items-center justify-center p-6">
          <CardContent className="h-full w-full relative">
            <BlocklyWorkspace
                className="absolute inset-0 w-full h-full dark:bg-gray-600"
                initialXml='<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_if" id="4#-DC6cfbWkw7xa(?jf#" x="33" y="30"><data>{"ownerID":"661e7e96e5df0f647b074d4a","ownerName":"test test"}</data></block></xml>'
                workspaceConfiguration={{
                media: "https://google.github.io/blockly/media/",
                
                //theme: Theme,
                collapse: false,
                comments: false,
                disable: true,
                maxBlocks: Infinity,
                horizontalLayout: true,
                toolboxPosition: 'start', // Updated toolbox position to 'start'
                renderer: 'zelos',
                css: true,
                rtl: false,
                scrollbars: false,
                oneBasedIndex: false,
                readOnly: true,
                trashcan: false,
                move: {
                    scrollbars: false,
                    drag: false,
                    wheel: false
                },
                zoom: {
                    controls: false,
                    wheel: true,
                    startScale: 1,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                },
                grid: {
                    spacing: 20,
                    length: 1,
                    colour: '#ffffff',
                    snap: true
                },
                }}
                />

          </CardContent>
        </Card>
      );
    }

    return cards;
  };

  const gridClasses = () => {
    if (cardsPerPage === 4) return "grid grid-cols-2 grid-rows-2 gap-4 h-full";
    if (cardsPerPage === 6) return "grid grid-cols-3 grid-rows-2 gap-4 h-full";
    
  };

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

  
 
  
  
  