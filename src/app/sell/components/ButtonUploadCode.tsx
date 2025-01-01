import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { uploadJsonFile } from "@/server/actions/uploadJsonFile";
import { Loader, UploadCloud } from "lucide-react";
import { SetStateAction, useTransition } from "react";
import { Code } from "./SellForm";

const ButtonUploadCode = ({
  code,
  setUploadedCodeUrl,
  isDisabled,
}: {
  code: Code;
  setUploadedCodeUrl: React.Dispatch<SetStateAction<string>>;
  isDisabled?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleUploadCode = (code: Code) => {
    startTransition(async () => {
      const { status, message, data } = await uploadJsonFile(code);
      if (status === "success") {
        toast({
          variant: "default",
          title: "Successful",
          description: "Code uploaded succesfuly!",
        });
      } else if (status === "error") {
        toast({
          variant: "destructive",
          title: "Erros",
          description: `Unexpected error. ${message}`,
        });
      }
      setUploadedCodeUrl(data);
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending || isDisabled ? true : false}
      onClick={() => handleUploadCode(code)}
      className="flex items-center gap-2 mt-2 max-w-fit"
    >
      <span className="text-xs"> {isPending ? "Uploading..." : "Upload code"}</span>
      {isPending ? <Loader className="animate-spin stroke-white" /> : <UploadCloud />}
    </Button>
  );
};

export default ButtonUploadCode;
