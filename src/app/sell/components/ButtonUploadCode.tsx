import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { uploadJsonFile } from "@/server/actions/uploadJsonFile";
import { Loader, UploadCloud } from "lucide-react";
import { useTransition } from "react";

const ButtonUploadCode = ({
  code,
  setUploadedCodeUrl,
  isDesabled,
}: {
  code: string;
  setUploadedCodeUrl: React.SetStateAction<string | any>;
  isDesabled?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClickUploadCode = (code: string) => {
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
      id="code"
      type="button"
      disabled={isPending || isDesabled ? true : false}
      onClick={() => handleClickUploadCode(code)}
      className="flex items-center gap-2 mt-2"
    >
      <span className="text-xs"> {isPending ? "Uploading..." : "Upload code </>"}</span>
      {isPending ? <Loader className="animate-spin stroke-white" /> : <UploadCloud />}
    </Button>
  );
};

export default ButtonUploadCode;
