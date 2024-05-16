"use client";


import React, {useEffect, useRef} from 'react';

import Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';
import locale from 'blockly/msg/en';
import 'blockly/blocks';
import Theme from './theme/modern';
import './BlocklyComponent.css';



Blockly.setLocale(locale);

interface BlocklyComponentProps {
  initialXml?: string;
  workspaceConfiguration?: Blockly.BlocklyOptions;
  children?: React.ReactNode;
  generateCode: boolean,
  setGenerateCode:  React.Dispatch<React.SetStateAction<boolean>>
}

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15);
};

function BlocklyComponent(props: BlocklyComponentProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const toolbox = useRef<HTMLDivElement>(null);
  const primaryWorkspace = useRef<Blockly.WorkspaceSvg | null>(null);

  const generateCodePython = () => {
    if (primaryWorkspace.current) {
      const code = pythonGenerator.workspaceToCode(primaryWorkspace.current);
      console.log("python", code);
    }
  };

  useEffect(() => {

    
    
    
    if(blocklyDiv.current){
      primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current!,
        ...props.workspaceConfiguration,
        
      });
    }

    if (props.initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(props.initialXml),
        primaryWorkspace?.current!,
      );
    }

    return () => {
      // Cleanup code (e.g., disconnecting Blockly)
      if (primaryWorkspace.current) {
        //primaryWorkspace.current.removeChangeListener(handleChange);
        primaryWorkspace.current.dispose();
      }
      //blocklyDiv.current?.removeEventListener(blocklyDiv.current, handleMouseMove);
    };
  }, [props.workspaceConfiguration]);

  useEffect(() => {
    if (props.generateCode) {
      generateCodePython();
      props.setGenerateCode(false);
    }
  }, [props.generateCode]);

  return (
    <div className='relative'>
      {/* <PointerCard
      myCursorId={myCursorId}
        title={
          <TitleComponent
            title="Hamdi"/>
        }
        color="#000"
        cursors={cursors}
      > */}
      <div ref={blocklyDiv} className='w-full h-[55vh] left-0' id="blocklyContainer" />
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
      {/* </PointerCard> */}
    </div>
  );
}

const TitleComponent = ({
  title
}: {
  title: string;
}) => (
  <div className="flex space-x-2 items-center">
    
    <p>{title}</p>
  </div>
);

// const PointerCard = ({cursors, title, color, children, myCursorId}: {
//   cursors: { [key: string]: { x: number; y: number } },
//   title: React.ReactNode,
//   color: string,
//   children: React.ReactNode,
//   myCursorId: string
// }) => {
//   return (
//     <div
//       className={cn("relative")}
//     >
//       <AnimatePresence>
//         {Object.entries(cursors).map(([cursorId, cursor]) => (
//           <FollowPointer
//             key={cursorId}
//             x={cursor.x}
//             y={cursor.y}
//             title={title + " cursorid "+ cursorId}
//             color={color}
//             isVisible={cursorId !== myCursorId}
//           />
//         ))}
//       </AnimatePresence>
//       {children}
//     </div>
//   );
// }

export default BlocklyComponent;
