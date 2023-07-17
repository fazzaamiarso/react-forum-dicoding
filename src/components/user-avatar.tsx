import { UserCircleIcon } from "@heroicons/react/24/solid";
import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

interface Props {
  imgSrc?: string;
  name?: string;
  size?: Size;
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
} satisfies { [K in Size]: string };

export const UserAvatar = ({ imgSrc, name, size = "md" }: Props): JSX.Element => {
  return (
    <Avatar.Root>
      <Avatar.Image src={imgSrc} alt={name} className={clsx("rounded-full", sizeMap[size])} />
      <Avatar.Fallback delayMs={100}>
        <UserCircleIcon aria-hidden="true" className={clsx(sizeMap[size])} />
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
