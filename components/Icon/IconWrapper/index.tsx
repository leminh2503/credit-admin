import * as React from "react";
import {IconWrapperProps} from "@app/components/Icon/IconWrapper/types";

export function IconWrapper({
  icon,
  color: colorProp,
  size: sizeProp,
  autoSize,
  ...restProps
}: {icon: React.ReactNode} & IconWrapperProps): JSX.Element {
  const color = colorProp || "currentColor";
  const size = sizeProp ? `${sizeProp}px` : autoSize ? "1em" : "16px";
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        color: color,
        width: size,
        height: size,
        display: "inline-flex",
        fontSize: "inherit",
      }}
      {...restProps}
    >
      {icon}
    </span>
  );
}
