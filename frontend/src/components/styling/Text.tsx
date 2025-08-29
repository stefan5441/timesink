export type TextProps = {
  content: string;
  as?: "p" | "small";
  size?: "small" | "medium" | "large";
  bold?: boolean;
  className?: string;
};

const textSizeClass = {
  small: "text-xs",
  medium: "text-base",
  large: "text-lg",
};

export const Text = ({ content, className, as: Tag = "p", size = "medium", bold }: TextProps) => {
  return <Tag className={`${className} ${textSizeClass[size]} ${bold ? "font-bold" : ""}`}>{content}</Tag>;
};
