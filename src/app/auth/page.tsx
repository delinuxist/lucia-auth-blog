import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Auth = () => {
  return (
    <section className='mx-auto min-h-screen flex justify-center items-center container'>
      <Tabs defaultValue='login' className='w-[546px]'>
        <TabsList className='grid w-full grid-cols-2 h-11'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Please log in to access your account. Enter your email and
                password to continue. If you don&apos;t have an account, you can
                register to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='register'>
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create a new account by filling in your details below. Enter
                your name, email, and password to get started. Already have an
                account? Log in instead.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Auth;
