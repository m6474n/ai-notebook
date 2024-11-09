import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    Hellow worlds...
    <Button>
     Click me !
    </Button>
    <div>
      <UserButton/>
    </div>
   </div>
  );
}
