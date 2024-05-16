"use client";
import { useEffect, useRef, useState } from "react";
import { BlocklyWorkspace, WorkspaceSvg } from 'react-blockly';
import Theme from '@/plugins/blockly/theme/modern';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Play, Save } from "lucide-react";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";
import { phpGenerator } from "blockly/php";
import { luaGenerator } from "blockly/lua";
import Blockly from "blockly";
import {json2xml, xml2json} from 'xml-js'
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import axiosInstance from "@/plugins/axios";
import { useRouter, useParams } from 'next/navigation'
import ProjectNotFound from "@/components/errors/project_not_found";
import BlocklyProjectSkeleton from "@/components/skeleton/blockly_project";
import { accessTokenType, useProfileContext } from "@/components/context/userprofile.context";
import { Socket, io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";
import { FollowerPointerCard } from "@/components/ui/following_pointer";
import { generateColor } from "@marko19907/string-to-color";
//import "@/plugins/blockly/generator/generator"
import { useSession } from "next-auth/react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar?: string;
}) => (
  <div className="flex space-x-2 items-center">
    {/* <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    /> */}
    <p>{title}</p>
  </div>
);

const DisplayAlertIfOldDataExist = (props: {setIsUserChoosedToDiscardUnsavedWork: (choice: boolean) => void, setIsUserChoosedToLoadUnsavedWork: (choice: boolean) => void}) => {
  const {setIsUserChoosedToDiscardUnsavedWork, setIsUserChoosedToLoadUnsavedWork} = props;
  return (
    <div className="flex items-center justify-center place-items-center place-content-center h-[89vh] my-0 mx-auto max-w-md">
      <Card className="px-2 py-3">
        <CardHeader className="px-2 py-5">
          <CardTitle className="text-lg text-center uppercase">Unsaved work found</CardTitle>
          <CardDescription className="text-sm text-primary-foreground">This project have an unsaved work do you want load it?, in case if you want to discard the unsaved data you can't restore it again.</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col sm:flex-row sm:block gap-2 sm:gap-0 sm:px-0 sm:space-y-2 px-2 py-2">
          <Button  variant={'secondary'} className="w-full" onClick={() => setIsUserChoosedToLoadUnsavedWork(true)}>Load unsaved work</Button>
          <Button variant={'destructive'} className="w-full" onClick={() => setIsUserChoosedToDiscardUnsavedWork(true)}>Discard unsaved work</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function Page() {
  const [xml, setXml] = useState<string>("");
  const [language, setLanguage] = useState("python");
  const [workspace, setWorkspace] = useState<WorkspaceSvg>();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>(""); // User role [owner, user]
  const [projectData, setProjectData] = useState<any>({}); // Project data [name, description, id, created_at, updated_at, user_id, workspace_data, user_role]
  const [workHistory, setWorkHistory] = useState<any>([]); // Work history [id, project_id, user_id, workspace_data, created_at, updated_at]
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error messages [message, line, column, type, severity]
  const { data } = useSession();
  const [toolbox, setToolbox] = useState<any[]>([]); // Toolbox [kind, contents, name, colour, type, init, workspaceToCode, workspaceConfiguration, media, theme, collapse, comments, disable, maxBlocks, horizontalLayout, toolboxPosition, css, rtl, scrollbars, oneBasedIndex, readOnly, trashcan, move, zoom, grid, spacing, length, colour, snap
  const [blocksWs, setBlocksWs] = useState<Socket | null>();
  const [ws, setWs] = useState<Socket | null>();
  const { toast } = useToast();
  const params = useParams();
  const { userInformation } = useProfileContext();
  const [workspaceChanged, setWorkspaceChanged] = useState<boolean>(false); // Check if workspace is changed [true, false]
  const [isUnsavedWork, setIsUnsavedWork] = useState<boolean>(false); // Check if there is any unsaved work [true, false]
  const [isUserChoosedToLoadUnsavedWork, setIsUserChoosedToLoadUnsavedWork] = useState<boolean>(false); // Check if user choosed to load unsaved work [true, false]
  const [isUserChoosedToDiscardUnsavedWork, setIsUserChoosedToDiscardUnsavedWork] = useState<boolean>(false); // Check if user choosed to discard unsaved work [true, false]
  const [isLoadedFromUserChoice, setIsLoadedFromUserChoice] = useState<boolean>(false); // Check if workspace is loaded from user choice [true, false]
  let lastSentTime: number = 0;
  
  

  
  
  

  const generateCode = () => {
    let generatedCode: string;
    switch (language) {
      
      case "javascript":
          generatedCode = javascriptGenerator.workspaceToCode(workspace);
          setCode(generatedCode);
        break;
      case "python":
          generatedCode = pythonGenerator.workspaceToCode(workspace);
          setCode(generatedCode);
        break;
      case "php":
          generatedCode = phpGenerator.workspaceToCode(workspace);
          setCode(generatedCode);
        break;
      case "lua":
          generatedCode = luaGenerator.workspaceToCode(workspace);
          setCode(generatedCode);
        break;
    
      default:
        break;
    }
  }

  const saveWorkspace = async () => {
    const data = workSpaceToXml() || "";
    if(data == "") return;

    await axiosInstance.post(`/projects/save`, {projectId:params.id,workData: data}).then((res) => {
      console.log(res.data);
      toast({
        title: "Saved",
        description: "Workspace data saved successfully",
        duration: 5000,
        variant: "default",
        className: "bg-green-500 text-white"
      });
    }).catch((err) => {
      console.log(err.response.data);
    })
  }

  const workSpaceToXml = () => {
    const xmlData = Blockly.Xml.workspaceToDom(workspace!);// Extract XML and convert to JSON
    const xmlText = new XMLSerializer().serializeToString(xmlData);
    return xmlText;
  }

  const emitWorkspaceCopyData = () => {
    const xml = workSpaceToXml();
    if(ws && xml) {
      console.log("emitted", xml)
      ws.emit('workSpaceCopyData', xml);
    }
  }
  const handleSendCommandsToRobot = () => {
    if(blocksWs) {
      blocksWs.emit("robot", {commands: code});
    } else {
      console.log("Blocks websocket not connected");
    }
  }

  const handleDeleteCurrentProjectUnsavedCopy = async () => {
    await axiosInstance.delete(`/projects/copy/delete`, {
      data: {
        projectId: params.id
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err.response.data);
    })
  }

  const sendUserMousePosition = (x: number, y: number) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastSentTime;

      if (timeDiff >= 100) {
          if (ws) {
            ws?.emit('cursor_updates', {x, y})
            console.log("sent")
          };
          
          lastSentTime = currentTime;
      }
  }
  // Fetch predefined blocks from database
  useEffect(() => {
    // Fetch blocks from database
    const fetchBlocks = async () => {
      setLoading(true);
      await axiosInstance.get(`/blocks/predefined`).then((res) => {
        console.log(res.data.definedData)
        const blocks = res.data.definedData;
        blocks.forEach((block: any) => {
          Blockly.Blocks[block.name] = {
            init: function() {
              const jsonDefinition = JSON.parse(block.blockDefinition);
              this.jsonInit(jsonDefinition);
              // this.setPreviousStatement(true, null);
              // this.setNextStatement(true, null);
              this.setColour(jsonDefinition.colour);
              this.setTooltip(jsonDefinition.tooltip);
              this.setHelpUrl(jsonDefinition.helpUrl);
              this.data = JSON.stringify({
                "ownerID": `${userInformation?.userId}`,
                "ownerName": `${userInformation?.name}`,
              })
            }
          }
          pythonGenerator.forBlock[block.name] = () => {
            var code = block.pythonCode;
            return code
          } 
        });
        setToolbox(res.data.toolBox)
        //Blockly.defineBlocksWithJsonArray(blocks);
      }).catch((err) => {
        console.log(err.response.data);
      })
    }

    const fetchProjectSavedData = async () => {
      await axiosInstance.get(`/projects/${params.id}`).then((res) => {
        console.log(res.data)
        setProjectData(res.data.projectData);
        setWorkHistory(res.data.workHistory);
        setUserRole(res.data.userRole);
        if(res.data.workHistory != null) {
          //setXml(res.data.workHistory.mainCopy);
          if(typeof res.data.workHistory.mainCopy != "undefined" && res.data.workHistory.mainCopy != null && res.data.workHistory.mainCopy != "") {
            setIsUnsavedWork(true);
          } else if(res.data.workHistory.workData != null) {
            setXml(res.data.workHistory.workData || "");
            console.log("loaded", res.data.workHistory.workData)
            setIsUnsavedWork(false);
            setIsLoadedFromUserChoice(true);
          } else {
            setIsLoadedFromUserChoice(true);
            setIsUnsavedWork(false);
          }
          
        } else {
          setIsLoadedFromUserChoice(true);
        }
        

      }).catch((err: any) => {
        setPermissionDenied(true);
        console.log(err)
      }).finally(() => {
        setLoading(false);
      })
    }
    fetchProjectSavedData();
    fetchBlocks();
  }, []);


  // Handle user mouse position
  useEffect(() => {
    let isTouching = false; 

    function handleInputEvent(event: MouseEvent | TouchEvent) {
        var svg = workspace?.getParentSvg();
        const svgRect = svg?.getBoundingClientRect();

        let inputX: number = 0;
        let inputY: number = 0;

        if (event instanceof MouseEvent) {
            inputX = (event.clientX - svgRect?.left!) / workspace?.scale!;
            inputY = (event.clientY - svgRect?.top!) / workspace?.scale!;
        } else if (event instanceof TouchEvent) {
            var touch = event.touches[0];
            inputX = (touch.clientX - svgRect?.left!) / workspace?.scale!;
            inputY = (touch.clientY - svgRect?.top!) / workspace?.scale!;
        }
        sendUserMousePosition(inputX || 0, inputY || 0);
    }

    function handleStart(event: MouseEvent | TouchEvent) {
        if (event instanceof TouchEvent) {
            isTouching = true;
        }
        handleInputEvent(event);
    }

    function handleMove(event: MouseEvent | TouchEvent) {
        if (!isTouching || event instanceof MouseEvent) {
            handleInputEvent(event);
        }
    }

    function handleEnd() {
        isTouching = false;
    }

    // Attach the event handlers to the Blockly workspace or any relevant DOM element
    if (workspace) {
        if(xml) {
          // clear workspace data and load from xml
          Blockly.Events.disable();
          try {
            const parser = new DOMParser()
            const xmlElement = Blockly.utils.xml.textToDom(xml)
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlElement, workspace);
            generateCode();
          } catch (error) {
            toast({
              title: "Error",
              description: "There was an error while loading the workspace data",
              duration: 5000,
              variant: "destructive"
            })
          }
          
          Blockly.Events.enable();
        }
        var svg = workspace?.getParentSvg();
        svg?.addEventListener('mousedown', handleStart);
        svg?.addEventListener('touchstart', handleStart);
        svg?.addEventListener('mousemove', handleMove);
        svg?.addEventListener('touchmove', handleMove);
        svg?.addEventListener('mouseup', handleEnd);
        svg?.addEventListener('touchend', handleEnd);

        // Cleanup function to remove the event listeners when component unmounts
        return () => {
            svg?.removeEventListener('mousedown', handleStart);
            svg?.removeEventListener('touchstart', handleStart);
            svg?.removeEventListener('mousemove', handleMove);
            svg?.removeEventListener('touchmove', handleMove);
            svg?.removeEventListener('mouseup', handleEnd);
            svg?.removeEventListener('touchend', handleEnd);
        };
    }
}, [workspace, ws]);


  // Function to connect to WebSocket
  const connectToWebSocket = (url: string, setFn: (socket: Socket | null) => void) => {
    const socket = io(url, {
        extraHeaders: {
            Authorization: `Bearer ${data?.user?.accessToken}`,
        }
    });
    socket.on('connect', () => {
        setFn(socket);
    });
    socket.on('disconnect', () => {
        setFn(null);
    });
  };
  // Listen to worspace changes
  useEffect(() => {
    const listenToWorkSpaceChanges = (event: any) => {

      if(!workspaceChanged) setWorkspaceChanged(true);
      // Handle block creation event
      if(event.type == Blockly.Events.BLOCK_CREATE) {
        var block = workspace?.getBlockById(event.blockId);
        const xmlData = Blockly.Xml.blockToDom(block!);
        const xmlText = new XMLSerializer().serializeToString(xmlData);

        ws?.emit("block_created", {block: xmlText, blockId: event.blockId});
        emitWorkspaceCopyData();
        // Generate code when workspace changes
        generateCode();
      }

      // Send event when block is moved and handle sub events too
      if(event.type == Blockly.Events.BLOCK_MOVE && Array.isArray(event.reason)) {
        if(event.reason.length == 1 && event.reason[0] == "snap") {
          let block = workspace?.getBlockById(event.blockId);
          if(block) {

            ws?.emit("block_moved", {
              x: event.newCoordinate.x || 0,
              y: event.newCoordinate.y || 0,
              blockId: event.blockId,
            });
            emitWorkspaceCopyData();
          }
        }
        // Send event when block is connected to new parent
        if(event.reason.includes("connect")) {
          let block = workspace?.getBlockById(event.blockId);
          if(block) {
            ws?.emit("block_connected_to_new_parent", {
              parentId: event.newParentId,
              blockId: event.blockId,
            });
            emitWorkspaceCopyData();
            // Generate code when workspace changes
            generateCode();
          }
        }

        // Send event when block is disconnected from old parent
        if(event.reason.includes("disconnect")) {
          let block = workspace?.getBlockById(event.blockId);
          if(block) {

            ws?.emit("block_disconnected_from_old_parent", {
              parentId: event.oldParentId,
              blockId: event.blockId,
            });
            emitWorkspaceCopyData();
            // Generate code when workspace changes
            generateCode();
          }
        }
      }

      // Send event when block is deleted
      if(event.type == Blockly.Events.BLOCK_DELETE) {
        ws?.emit("block_deleted", {blockId: event.blockId});
        emitWorkspaceCopyData();
        // Generate code when workspace changes
        generateCode();
      }

      // Send event when user clicks on block to disable it in others workspace
      if(event.type == Blockly.Events.SELECTED && event.newElementId) {
        let newSelectedBlock = workspace?.getBlockById(event.newElementId);
        //let oldSelectedBlock = workspace?.getBlockById(event.oldElementId);
        if(newSelectedBlock) {
          ws?.emit("block_clicked", {newSelectedBlock: event.newElementId, oldSelectedBlock: event.oldElementId});
          emitWorkspaceCopyData();
        }
      }
      if(event.type == Blockly.Events.SELECTED && event.oldElementId) {
        let oldSelectedBlock = workspace?.getBlockById(event.oldElementId);
        if(oldSelectedBlock) {
          ws?.emit("free_selected_block", {blockId: event.oldElementId});
          emitWorkspaceCopyData();
        }
      }

      // if(event.type == Blockly.Events.CLICK && event.blockId) {
      //   let block = workspace?.getBlockById(event.newElementId);
      //   if(block && block.isEnabled()) {
      //     ws?.emit("block_clicked", {blockId: event.blockId});
      //   }
      // }
  }
     
      
    workspace?.addChangeListener(listenToWorkSpaceChanges);
    return () => {
      workspace?.removeChangeListener(listenToWorkSpaceChanges);
    }
  }
  , [workspace, ws]);

  // Connect to WebSocket 
  useEffect(() => {
    if(workspace && !loading  && isLoadedFromUserChoice) {
      if(ws == null) {
        connectToWebSocket(`https://iblock-back-test.onrender.com/?projectId=${params.id}`, setWs);
      }
      if(ws?.connected) {
        toast({
          title: "Connected",
          description: "You are now connected to the server",
          duration: 5000
        });
        // ws.on('newWorkSpaceXmlData', (data: any) => {
        //   const xml = json2xml(data.payload.json, {compact: true, spaces: 4});
        //   const xmlElement = Blockly.utils.xml.textToDom(xml);
        //   Blockly.Events.disable();
        //   Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlElement, workspace);
        //   Blockly.Events.enable();

        // });
        ws?.on("user_joined", (data: accessTokenType) => {
          if(data.userId.toString() !== userInformation?.userId) {
            toast({
              variant: "default",
              title: "User Joined",
              description: `${data.name} has joined the project`,
            });
          }
        })
    
        ws?.on("user_left", (data: accessTokenType) => {
          if(data.userId.toString() !== userInformation?.userId) {
            toast({
              variant: "default",
              title: "User Left",
              description: `${data.name} has left the project`,
            });
          }
        });

        ws?.on("newBlockByUser", (data: any) => {
            function addBadgeX(block: any) {
      
              const badgeGroup = Blockly.utils.dom.createSvgElement('g', {
                'x': 150,
                'y': 150,
              }, block.getSvgRoot());
          
              // Create the star path
              const starPath = 'M12 1.04l2.777 6.961h7.027l-5.652 4.374 2.208 6.927L12 14.458l-7.36 4.848 2.208-6.927L2.195 7.995h7.027L12 1.04z';
              
              // Create the badge star shape
              Blockly.utils.dom.createSvgElement('path', {
                  'x': -200,
                  'y': -200,
                  'd': starPath,
                  'class': 'block-owner-badge',
                  'style': `fill: ${generateColor(data.user.userId)}; stroke: #000; stroke-width: 0.5px;` 
              }, badgeGroup);
          }
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
              const parser = new DOMParser();
              const xmlData = parser.parseFromString(data.payload.block, 'text/xml');
              const isBlock = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              if(isBlock) {
                return;
              }
              Blockly.Events.disable();
              Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
              Blockly.Events.enable();
              const createdBlock = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              if(createdBlock) {
                addBadgeX(createdBlock);
                //createdBlock.setMovable(false);
                //createdBlock.setDeletable(false);
                //createdBlock.setEnabled(false);
              }
            }
          }
        });


        ws?.on("blockMovedByUser", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
              let block = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              if(block) {
                Blockly.Events.disable();
                block.moveBy(data.payload.x - block.getRelativeToSurfaceXY().x, data.payload.y - block.getRelativeToSurfaceXY().y, ['snap']);
                Blockly.Events.enable();
              }
              
            // const Block = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
            }
          }
        });

        ws?.on("blockConnectedToNewParent", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
              let block = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              let parent = Blockly.getMainWorkspace().getBlockById(data.payload.parentId);
              if(block && parent) {
                Blockly.Events.disable();
                parent.nextConnection!.connect(block.previousConnection!);
                Blockly.Events.enable();
              }
              
            // const Block = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
            }
          }
        });

        ws?.on("blockDeletedByUser", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
              let block = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              if(block) {
                Blockly.Events.disable();
                block.unplug(true);
                
                block.dispose(true);
                Blockly.Events.enable();
              }
              
            // const Block = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
            }
          }
        });

        ws?.on("blockDisconnectedFromOldParent", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
              let block = Blockly.getMainWorkspace().getBlockById(data.payload.blockId);
              let parent = Blockly.getMainWorkspace().getBlockById(data.payload.parentId);
              if(block && parent) {
                Blockly.Events.disable();
                parent.nextConnection!.disconnect();
                Blockly.Events.enable();
              }
              
            // const Block = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
            }
          }
        });

        ws?.on("blockClickedByUser", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            /**
             * Event "selected" is fired when user clicks on block
             * In this event we receive the block id of the block clicked by user with the old slected block id
             * We can use this event to disable the block clicked by user in other users workspace
             */
            if(workspace && data.payload.newSelectedBlock) {
              let newSelectedBlock = Blockly.getMainWorkspace().getBlockById(data.payload.newSelectedBlock);
              let oldSelectedBlock = Blockly.getMainWorkspace().getBlockById(data.payload.oldSelectedBlock);
              //console.log("Block clicked", data.payload.newSelectedBlock, data.payload.oldSelectedBlock)
              if(newSelectedBlock) {
                console.log("runned"  )
                Blockly.Events.disable();
                newSelectedBlock.setEnabled(false);
                newSelectedBlock.setMovable(false);
                newSelectedBlock.setDeletable(false);
                
                // check if block has next statement
                newSelectedBlock.setWarningText("This block is being used by another user");
                Blockly.Events.enable();
              }
              if(oldSelectedBlock && data.payload.oldSelectedBlock !== data.payload.newSelectedBlock) {
                console.log("runned")
                Blockly.Events.disable();
                oldSelectedBlock.setEnabled(true);
                oldSelectedBlock.setMovable(true);
                oldSelectedBlock.setDeletable(true);
                // check if block has next statement
                oldSelectedBlock.setWarningText(null);
                Blockly.Events.enable();
              }
              
            // const Block = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(data.payload.block), Blockly.getMainWorkspace());
            }
          }
        });

        // This logic will be executed when the user is not selecting any block then we need to free the previous selected block in other users workspaces
        ws?.on("freeBlock", (data:any) => {
          if(data.user.userId.toString() !== userInformation?.userId) {
            if(workspace) {
                let block = workspace.getBlockById(data.payload.blockId);
                if(block) {
                  console.log("Block found")
                  Blockly.Events.disable();
                  block.setEnabled(true);
                  block.setMovable(true);
                  block.setDeletable(true);
                  block.setWarningText(null);
                  Blockly.Events.enable();
                } else {
                  console.log("Block not found")
                }
            }
          }
        });
      }
    }
    return () => {
      if(ws?.connected) {
        ws.disconnect();
        console.log("ws disconnected")
      };
    };
  }, [ws, workspace, loading, isLoadedFromUserChoice]);
  // Connect to WebSocket 
  useEffect(() => {
    if(workspace && !loading && isLoadedFromUserChoice) {
      if(blocksWs == null) {
        connectToWebSocket("https://iblock-back-test.onrender.com/robot", setBlocksWs);
      }
      if(blocksWs?.connected) {
        // toast({
        //   title: "Connected",
        //   description: "You are now connected to the server x",
        //   duration: 5000
        // });
      }
    }
    return () => {
      if(blocksWs?.connected) {
        blocksWs.disconnect();
        console.log("ws disconnected")
      };
    };
  }, [blocksWs, workspace, isLoadedFromUserChoice, loading])

  // Load workspace depends on the user choice
  useEffect(() => {
    if(isUserChoosedToLoadUnsavedWork && workHistory.mainCopy) {
      //console.log("loaded", workHistory.mainCopy)
      setXml(workHistory.mainCopy);
      setIsLoadedFromUserChoice(true);
    } 
    if(isUserChoosedToDiscardUnsavedWork) {
      setXml(workHistory.workData || "");
      handleDeleteCurrentProjectUnsavedCopy();
      setIsLoadedFromUserChoice(true);
    }
  }, [isUserChoosedToLoadUnsavedWork, isUserChoosedToDiscardUnsavedWork, isLoadedFromUserChoice]);

  if(loading || toolbox.length == 0) return <BlocklyProjectSkeleton />
  //if(!ws?.connected || !blocksWs?.connected && workspace)  return <ProjectNotFound message="Sorry but we were not able to load you project try again later or contact our support team if this problem persist." />
  if(permissionDenied) return <ProjectNotFound message={errorMessage}/>
  if(!isLoadedFromUserChoice) return <DisplayAlertIfOldDataExist setIsUserChoosedToLoadUnsavedWork={setIsUserChoosedToLoadUnsavedWork} setIsUserChoosedToDiscardUnsavedWork={setIsUserChoosedToDiscardUnsavedWork} />
  return (
    <div className="flex flex-col">
     
    {/* sm:hidden  */}
    <div className="px-2 flex">
          <div className="flex-1">&nbsp;</div>
          <div className="flex flex-row flex-wrap gap-2">
            <Button variant={'ghost'} className="hover:bg-transparent" onClick={() => saveWorkspace()} disabled={code == "" || !workspaceChanged}>
              <Save className="h-5 w-5" />
            </Button>
            <Button variant={'ghost'} className="hover:bg-transparent" onClick={() => handleSendCommandsToRobot} disabled={code == ""}>
              <Play className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        </div>

  <div style={{ display: "flex", overflow: "hidden", background: "rgb(228, 228, 228)" }} className="overflow-hidden w-full flex-1 h-full">
  
    {/* sm:col-span-6 */}
    <div style={{ flex: "2.1 1 0px", overflow: "hidden", }} className="h-full w-full">
    <FollowerPointerCard
        title={
          <TitleComponent
            title={userInformation?.name || "Anonymous"}
            
          />
        }
        role={userRole}
        socket={ws!}
      >
      <div style={{ flex: "2.1 1 0px", overflow: "hidden", }} className="flex w-screen h-[88vh]">
      <BlocklyWorkspace
        className="w-full h-full dark:bg-gray-600"
        toolboxConfiguration={toolbox[0]}
        initialXml={xml}
        onXmlChange={setXml}
        onInject={setWorkspace}
        workspaceConfiguration={{
          media: "https://google.github.io/blockly/media/",
          //theme: Theme,
          collapse: true,
          comments: true,
          disable: true,
          maxBlocks: Infinity,
          horizontalLayout: true,
          toolboxPosition: 'top',
          renderer: 'zelos',
          css: true,
          rtl: false,
          scrollbars: true,
          oneBasedIndex: true,
          readOnly: false,
          trashcan: true,
          move: {
            scrollbars: true,
            drag: true,
            wheel: true
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
          },
          grid: {
            spacing: 20,
            length: .5,
            colour: '#F9F9F9',
            snap: true
          },
        }}
        />
      </div>
      
      </FollowerPointerCard>
    </div>
  </div>
  
</div>

  )
}
