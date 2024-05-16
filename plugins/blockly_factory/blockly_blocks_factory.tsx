"use client";
import { useCallback, useEffect, useState } from 'react';
import { AppController } from './app_controller';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { pythonLanguage } from '@codemirror/lang-python';
import {copilot} from "@uiw/codemirror-theme-copilot";
import { jsonLanguage } from "@codemirror/lang-json";


import { BlockFactory } from './factory';
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert-dialog";
import { AlertCircleIcon, TriangleAlertIcon } from 'lucide-react';
import { Block } from 'blockly';


const CodePreview = ({ jsonCode, languageCode, setFinalPythonCode }: {jsonCode: string, languageCode: string, setFinalPythonCode: (code: string) => void}) => {
  const onChange = useCallback((val: string, viewUpdate: any) => {
    setFinalPythonCode(val);
  }, []);
  return (
    <Tabs defaultValue="json" className="h-auto w-full">
    <TabsList className="grid w-full h-full grid-cols-2">
      <TabsTrigger value="json">JSON</TabsTrigger>
      <TabsTrigger value="code">Python</TabsTrigger>
    </TabsList>
    <TabsContent value="json" className='w-full h-full'>
      <Card className='h-full w-full rounded-none border-0 bg-transparent'>
        <CardContent className="space-y-2 pt-2">
          <CodeMirror height='300px' width='100%' value={jsonCode} extensions={[jsonLanguage, EditorView.editable.of(false), EditorState.readOnly.of(true)]} theme={copilot} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => {console.log("data",BlockFactory.updateLanguage())}} className='w-full'>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="code">
      <Card className='h-full w-full rounded-none border-0 bg-transparent'>
        <CardContent className="space-y-2 pt-2">
          <CodeMirror height='300px' value={languageCode} extensions={[pythonLanguage]} onChange={onChange} theme={copilot} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => {console.log("data",BlockFactory.updateLanguage())}} className='w-full'>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
      )
}
const RenderErrorsForBlockType = (props: {error: boolean, message: string}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        
          <AlertCircleIcon color='rgb(239 68 68)' className="h-5 w-5 text-red-500 dark:hover:bg-red-900 animate-pulse" />
        
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Error</AlertDialogTitle>
          <AlertDialogDescription>
            {props.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-end">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function BlocklyBlocksFactoryPage() {
    const [jsonCode, setJsonCode] = useState('');
    const [generatedPythonCode, setGeneratedPythonCode] = useState('');
    const [blockType, setBlockType] = useState('');
    const [isBlockTypeForbidden, setIsBlockTypeForbidden] = useState({error: true, message: ''});
    const [finalPythonCode, setFinalPythonCode] = useState('');
    const [blockFactoryData, setBlockFactoryData] = useState<any>(null);

    
    useEffect(() => {
      let blocklyFactory;
      blocklyFactory = new AppController();
      var init = function() {
        //const isloaded = blocklyFactory.isLoaded;
        console.log("blockFactoryData", blockFactoryData);
        if(!blockFactoryData){
          blocklyFactory.init();
          BlockFactory.setGeneratedJsonCode = setJsonCode;
          BlockFactory.generatedJsonCode = jsonCode;
          BlockFactory.setGeneratedPythonCode = setGeneratedPythonCode;
          BlockFactory.updatePreview(generatedPythonCode);
          BlockFactory.setBlockType = setBlockType;
          BlockFactory.setIsBlockTypeForbidden = setIsBlockTypeForbidden;
          setBlockFactoryData(blocklyFactory);
        }
        
        //window.addEventListener('beforeunload', blocklyFactory.confirmLeavePage);
        
      };

      init();

      return () => {
        setBlockFactoryData(null);
      }
    }, []);
    return (
      <>
        <div style={{overflow: 'hidden', height: '90vh' }} className="flex flex-wrap p-1">
          <div style={{ flex: '1', overflow: 'hidden' }} className="w-1/2 h-full">
            <div id="buildblocks" className='w-full h-full'></div>
          </div>
          <div className="w-1/2 dark:bg-black px-1 h-full flex flex-col">
            <div id="previewDiv" className='w-full h-[200px] rounded-lg'></div>
            <Card className='flex-1 overflow-hidden h-full rounded-none'>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Code Preview for "{blockType}"</span>
                  {isBlockTypeForbidden.error && <RenderErrorsForBlockType error={isBlockTypeForbidden.error} message={isBlockTypeForbidden.message} />}
                </CardTitle>
              </CardHeader>
              <CardContent className='h-full'>
                <CodePreview jsonCode={jsonCode} languageCode={generatedPythonCode} setFinalPythonCode={setFinalPythonCode} />
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
}