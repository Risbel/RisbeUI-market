import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const AvatarTrigger = async () => {
  const { getUser } = getKindeServerSession();
  const { given_name, picture } = await getUser();
  const initials = given_name?.slice(0, 3).toUpperCase();

  const imageUrl = picture ?? `https://avatar.vercel.sh/${given_name}.svg?text=${initials}`;

  return (
    <Avatar>
      {imageUrl && <AvatarImage src={imageUrl} alt={given_name as string} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export interface AvatarTriggerProps {}

export default AvatarTrigger;
