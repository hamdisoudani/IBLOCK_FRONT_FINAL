import { UserProject } from "@/lib/types/general.types"
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { BlocklyWorkspace, WorkspaceSvg } from "react-blockly";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import Blockly from "blockly";
import axiosInstance from "@/plugins/axios";

type Props = {
    project: UserProject
}


const CursorComponent = () => {
    return (
        <svg id="cursorSVG" width="100" height="50" xmlns="http://www.w3.org/2000/svg" className="hidden">
            <g>
            <path d="M10 10 L30 10 L20 30 Z" fill="black" />
            <text x="35" y="20" font-family="Arial" font-size="14" fill="black">Your Name</text>
            </g>
        </svg>
    )
}
export default function DisplayStudentsWorkspaceLiveUpdates(props: Props) {
    const { project } = props;
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [workspace, setWorkspace] = useState<WorkspaceSvg>();
    const [ws, setWs] = useState<Socket | null>(null);
    const { data } = useSession();
    
     // Function to connect to WebSocket
    const connectToWebSocket = (url: string, setFn: (socket: Socket | null) => void) => {
        const socket = io(url, {
            extraHeaders: {
                Authorization: `Bearer ${data?.user?.accessToken}`,
            }
        });
        socket.on('connect', () => {
            setFn(socket);
            setConnected(true);
        });
        socket.on('disconnect', () => {
            setFn(null);
            setConnected(false)
        });
    };
    useEffect(() => {
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
                  }
                }
              });
              //Blockly.defineBlocksWithJsonArray(blocks);
            }).catch((err) => {
              console.log(err.response.data);
            }).finally(() => {
                setLoading(false);
            })
          }
        if (workspace) {
            fetchBlocks();
        }
    } , [workspace]);

    useEffect(() => {
        if(!loading && !connected && !ws) {
            connectToWebSocket(`https://iblock-back-test.onrender.com/?projectId=${project._id}`, setWs);
        }
    } , [loading]);
    

    useEffect(() => {
        if(ws) {
            ws.on('newStudentWorkspaceData', (data) => {
                // clear workspace and load the received xml to the workspace
                workspace?.clear();
                const xml = Blockly.utils.xml.textToDom(data.workCopy);
                Blockly.Xml.domToWorkspace(xml, workspace!);
                
                // Get blockly canvas and add an image to it
                const svg =  `
                <svg id="cursorSVG" width="100" height="50" xmlns="http://www.w3.org/2000/svg">
            <g>
            <path d="M10 10 L30 10 L20 30 Z" fill="black" />
            <text x="35" y="20" font-family="Arial" font-size="14" fill="black">Your Name</text>
            </g>
        </svg>
        `
                const blocklyCanvas = workspace?.getCanvas();
                const img = new Image();
                img.src = 'data:image/svg+xml;base64,' + btoa(svg);
                blocklyCanvas?.appendChild(img);

            });
        }
    } , [ws]);
    return (
        <Card className="flex items-center justify-center p-1 h-[300px] border-0 shadow-none">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                    <p className="text-lg text-white">Loading...</p>
                </div>
            )}
          <CardContent className="h-full w-full relative">
            <BlocklyWorkspace
                className="absolute inset-0 w-full h-full dark:bg-gray-600"
                onInject={(workspace) => setWorkspace(workspace)}
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
                    length: 1,
                    colour: '#ffffff',
                    snap: true
                },
                }}
            />

          </CardContent>
        </Card>
        
    )
}