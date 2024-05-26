import { UserProject } from "@/lib/types/general.types"
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { BlocklyWorkspace, WorkspaceSvg } from "react-blockly";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import Blockly from "blockly";
import axiosInstance from "@/plugins/axios";
import { generateColor } from "@marko19907/string-to-color";

type Props = {
    project: UserProject
}



export default function DisplayStudentsWorkspaceLiveUpdates(props: Props) {
    const { project } = props;
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [xml, setXml] = useState('');
    const [workspace, setWorkspace] = useState<WorkspaceSvg>();
    const [ws, setWs] = useState<Socket | null>(null);
    const { data } = useSession();
    

    function addBadge(block: any, userId: string, userName: string) {
      
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
            'style': `fill: ${generateColor(userId)}; stroke: #000; stroke-width: 0.5px;` 
        }, badgeGroup);

        // Create the text element for the user name
        Blockly.utils.dom.createSvgElement('text', {
            'x': -76,
            'y': 10, // Position the text slightly above or below the star
            'class': 'block-owner-name',
            'style': `font-size: 16px; fill: ${generateColor(userId)}; font-weight: bold; text-anchor: middle;`
        }, badgeGroup).textContent = userName;
    }


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
            })
        }
        const fetchProjectSavedData = async () => {
            await axiosInstance.get(`/projects/${props.project._id}`).then((res) => {
              if(res.data.workHistory != null) {
                    //setXml(res.data.workHistory.mainCopy);
                    if(typeof res.data.workHistory.mainCopy != "undefined" && res.data.workHistory.mainCopy != null && res.data.workHistory.mainCopy != "") {
                    setXml(res.data.workHistory.mainCopy)
                    } else if(res.data.workHistory.workData != null) {
                    setXml(res.data.workHistory.workData || "");
                    } else {
                        setXml("");
                    }

                }
              
      
            }).catch((err: any) => {
              console.log(err)
            }).finally(() => {
              setLoading(false);
            })
        }
        fetchBlocks();
        fetchProjectSavedData()
    } , []);

    useEffect(() => {
        if(workspace && xml) {
            const data = Blockly.utils.xml.textToDom(xml);
            Blockly.Xml.domToWorkspace(data, workspace);

            const blocks = workspace?.getAllBlocks();
            blocks?.forEach((block) => {
                // add identification to the block
                const data = JSON.parse(block.data!);
                if(data) {
                    addBadge(block, data.ownerID, data.ownerName);
                }
            });
        }
    }, [workspace, xml]);

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
                const blocks = workspace?.getAllBlocks();
                blocks?.forEach((block) => {
                    // add identification to the block
                    const data = JSON.parse(block.data!)
                    if(data) {
                        addBadge(block, data.ownerID, data.ownerName);
                    }
                });
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
                initialXml={xml}
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