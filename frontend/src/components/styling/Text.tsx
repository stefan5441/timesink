export type TextProps = {
  content: string;
  as?: "p" | "small"; // user picks the element
  size?: "small" | "medium" | "large";
  bold?: boolean;
};

const textSizeClass = {
  small: "text-xs",
  medium: "text-base",
  large: "text-lg",
};

export const Text = ({ content, as: Tag = "p", size = "medium", bold }: TextProps) => {
  return <Tag className={`${textSizeClass[size]} ${bold ? "font-bold" : ""}`}>{content}</Tag>;
};
