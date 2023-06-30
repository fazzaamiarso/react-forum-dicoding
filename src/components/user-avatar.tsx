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
        {name
          .split(" ")
          .slice(0, 2)
          .map((word) => word.toUpperCase().charAt(0))
          .join("")}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
