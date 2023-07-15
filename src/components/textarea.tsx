import clsx from "clsx";
import React from "react";

interface TextAreaOwnProps {
  label: string;
  description?: string;
  error?: string;
}

type TextAreaProps = TextAreaOwnProps & React.ComponentPropsWithoutRef<"textarea">;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, name, error, className, description, ...rest }, forwardedRef) => {
    return (
      <div className="w-full">
        <div className="mb-2">
          <label htmlFor={id ?? name} className="block font-semibold">
            {label}
          </label>
          <div className="text-xs">{description}</div>
        </div>
        <textarea
          {...rest}
          ref={forwardedRef}
          id={id ?? name}
          name={name}
          className={clsx("w-full resize-y rounded-sm border-zinc-400", className)}
        />
        {error !== undefined && (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default TextArea;
