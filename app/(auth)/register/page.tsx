
"use client";
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import StudentRegister from '@/components/signup/student_signup';
import TeacherRegister from '@/components/signup/teacher_signup';


const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <Tabs defaultValue="Student" className="w-full md:w-[600px] ml-5 md:ml-0 mr-5 md:mr-0">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Student">Student</TabsTrigger>
          <TabsTrigger value="Teacher">Teacher</TabsTrigger>
        </TabsList>
        <TabsContent value="Student">
          <Card>
            <CardContent className="space-y-2">
              <StudentRegister />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Teacher">
          <Card>
            <CardContent className="space-y-2">
              <TeacherRegister />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RegisterPage;
