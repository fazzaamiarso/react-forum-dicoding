import clsx from "clsx";
import React from "react";

interface TextFieldOwnProps {
  label: string;
  description?: string;
  error?: string;
}

type TextFieldProps = TextFieldOwnProps & React.ComponentPropsWithoutRef<"input">;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, error, type = "text", className, description, ...rest }, forwardedRef) => {
    return (
      <div className="w-full">
        <div className="mb-2">
          <label htmlFor={id ?? name} className="block font-semibold text-zinc-800">
            {label}
          </label>
          {description !== undefined && <div className="text-xs">{description}</div>}
        </div>
        <input
          {...rest}
          ref={forwardedRef}
          id={id ?? name}
          name={name}
          type={type}
          className={clsx("mb-1 w-full rounded-sm border-zinc-400", className)}
        />
        {error !== undefined && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default TextField;