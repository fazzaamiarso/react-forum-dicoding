import { UserCircleIcon } from "@heroicons/react/24/solid";
import * as Avatar from "@radix-ui/react-avatar";

interface Props {
  imgSrc: string;
  name: string;
}

// TODO: add sizes props
export const UserAvatar = ({ imgSrc, name }: Props): JSX.Element => {
  return (
    <Avatar.Root>
      <Avatar.Image src={imgSrc} alt={name} className="aspect-square w-5 rounded-full" />
      <Avatar.Fallback>
        <UserCircleIcon aria-hidden="true" className="aspect-square w-5" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
