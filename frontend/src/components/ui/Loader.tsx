import { Loader2 } from "lucide-react";

export default function Loader(){
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
}