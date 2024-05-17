import { useAuth } from "../../hooks";
import { UserAvatar } from "../ui/user";

export const UserAvatarContainer = () => {
  const { user } = useAuth();
  return <UserAvatar username={user?.username} />;
};
