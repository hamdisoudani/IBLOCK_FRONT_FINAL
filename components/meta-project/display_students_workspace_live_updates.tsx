import { UserProject } from "@/lib/types/general.types"
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { BlocklyWorkspace, WorkspaceSvg } from "react-blockly";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";

type Props = {
    project: UserProject
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
        console.log(workspace, loading)
        if (workspace) {
            setLoading(false);
        }
    } , [workspace, loading]);

    useEffect(() => {
        if(!loading && !connected && !ws) {
            connectToWebSocket(`https://iblock-back-test.onrender.com/?projectId=${project._id}`, setWs);
        }
    } , [loading]);
    

    useEffect(() => {
        if(ws) {
            ws.on('newStudentWorkspaceData', (data) => {
                console.log(data);
            });
        }
    } , [ws]);
    return (
        <Card className="flex items-center justify-center p-1 h-[300px] border-0 shadow-none">
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
        
    )
}