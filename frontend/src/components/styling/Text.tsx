export type TextProps = {
  content: string;
  as?: "p" | "small";
  size?: "small" | "medium" | "large";
  bold?: boolean;
  className?: string;
};

export const Text = ({ content, className, as: Tag = "p", size = "medium", bold }: TextProps) => {
  const textSizeClass = {
    small: `text-xs ${bold ? "font-semibold" : ""}`,
    medium: `text-sm ${bold ? "font-semibold" : ""}`,
    large: `text-lg ${bold ? "font-bold" : ""}`,
  };

  return <Tag className={`${className} ${textSizeClass[size]}`}>{content}</Tag>;
};
