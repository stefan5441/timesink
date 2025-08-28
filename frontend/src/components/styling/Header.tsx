import type { JSX } from "react";

export type HeaderProps = {
  content: string;
  size?: "small" | "medium" | "large";
  bold?: boolean;
};

const sizeMap: Record<NonNullable<HeaderProps["size"]>, keyof JSX.IntrinsicElements> = {
  small: "h5",
  medium: "h3",
  large: "h1",
};

const sizeClass = {
  small: "text-sm",
  medium: "text-lg",
  large: "text-2xl",
};

export const Header = ({ content, size = "medium", bold = false }: HeaderProps) => {
  const Tag = sizeMap[size] || "h3";

  return <Tag className={`${sizeClass[size]} ${bold ? "font-bold" : ""} m-0 leading-normal inline`}>{content}</Tag>;
};
