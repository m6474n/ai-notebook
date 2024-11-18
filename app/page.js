"use client";
import Hero from "@/components/Hero";
import MainHeader from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    
    const result = await createUser({
      email: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      imageUrl: user.imageUrl,
    });
    console.log(result);
  };
  useEffect(() => {
    user && checkUser();
  }, [user]);

  return (
   
    <div>
       
       <Hero/>
      {/* Hellow worlds...
      <Button>Click me !</Button>
      <div>
        <UserButton />
      </div> */}
    </div>
  );
}
