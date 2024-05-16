"use client";
import { FormEvent, use, useCallback, useEffect, useState } from 'react';
import Blockly from 'blockly';
import { PrivateBlocklyFactory } from '@/plugins/private_blockly_factory/factory.core';
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert-dialog";
import { AlertCircleIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import {  pythonLanguage } from '@codemirror/lang-python';
import {copilot} from "@uiw/codemirror-theme-copilot";
import { jsonLanguage } from "@codemirror/lang-json";
import { useErrorToast, useSuccessToast } from '@/hooks/useToast';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import axiosInstance from '@/plugins/axios';

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
        {/* <CardFooter>
          <Button onClick={() => {console.log("data")}} className='w-full'>Save changes</Button>
        </CardFooter> */}
      </Card>
    </TabsContent>
    <TabsContent value="code">
      <Card className='h-full w-full rounded-none border-0 bg-transparent'>
        <CardContent className="space-y-2 pt-2">
          <CodeMirror height='300px' value={languageCode} extensions={[pythonLanguage]} onChange={onChange} theme={copilot} />
        </CardContent>
        {/* <CardFooter>
          <Button onClick={() => {console.log("data")}} className='w-full'>Save changes</Button>
        </CardFooter> */}
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
export default function PlaygroundComponent() {
  
  const [finalPythonCode, setFinalPythonCode] = useState('');
  const [jsonCode, setJsonCode] = useState('');
  const [pythonCode, setPythonCode] = useState('');
  const [xml, setXml] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlockTypeForbidden, setIsBlockTypeForbidden] = useState({error: false, message: ''});
  const [factory, setFactory] = useState<PrivateBlocklyFactory | null>(null);


  const factoryClass = new PrivateBlocklyFactory(setPythonCode, setJsonCode, setXml);
    useEffect(() => {
      
      factoryClass.init();
      setFactory(factoryClass);
      factoryClass.mainWorkspace?.addChangeListener(() => {
        factoryClass.updateLanguage();
      })
      factoryClass.mainWorkspace?.addChangeListener(Blockly.Events.disableOrphans);

      return () => {
        factoryClass.mainWorkspace?.removeChangeListener(Blockly.Events.disableOrphans);
        factoryClass.mainWorkspace?.removeChangeListener(() => {
          factoryClass.updateLanguage();
        })
      }
    }, []);

    const handleCreateNewBlock = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(factory?.isBlockTypeForbidden.error) {
        useErrorToast(factory?.isBlockTypeForbidden.message);
        return;
      }
      setIsSubmitting(true);
      await axiosInstance.post('/blocks/add', {
        name: factory?.blockType,
        blockDefinition: jsonCode,
        pythonCode: finalPythonCode,
        factoryXml: xml
      }).then((response) => {
        useSuccessToast("Block created successfully");
      }).catch((error) => {
        if(typeof error.response.data.message !== 'undefined' && Array.isArray(error.response.data.message)) {
          useErrorToast(error.response.data.message[0]);
          return;
        }
        if(typeof error.response.data.message !== 'undefined') {
          useErrorToast(error.response.data.message);
          return;
        }
        useErrorToast("Error creating block");
      }).finally(() => {
        setIsSubmitting(false);
      });
    }
  
  return (
    <div style={{overflow: 'hidden', height: '90vh' }} className="flex flex-wrap p-1">
          <div style={{ flex: '1', overflow: 'hidden' }} className="w-1/2 h-full">
            <div id="buildblocks" className='w-full h-full'></div>
          </div>
          <div className="w-1/2 dark:bg-black px-1 h-full flex flex-col">
            <div id="previewWorkspaceDiv" className='w-full h-[200px] rounded-lg'></div>
            <Card className='flex-1 overflow-hidden h-full rounded-none'>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Code Preview for "{factory?.blockType}"</span>
                  {factory?.isBlockTypeForbidden.error && <RenderErrorsForBlockType error={factory?.isBlockTypeForbidden.error} message={factory?.isBlockTypeForbidden.message} />}
                </CardTitle>
              </CardHeader>
              <CardContent className='h-full'>
                
                  <CodePreview jsonCode={jsonCode} languageCode={pythonCode} setFinalPythonCode={setFinalPythonCode} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className='w-full' variant="default" disabled={factory?.isBlockTypeForbidden.error || finalPythonCode == "" || isSubmitting}>Save block</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. After this a new block will be created under this name <b>{factory?.blockType}</b>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <form onSubmit={handleCreateNewBlock}>
                            <Button type='submit'>Continue</Button>
                          </form>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                
              </CardContent>
            </Card>
          </div>
        </div>
  );
}