export type ContainerProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string; // optional extra classes
};

const sizeClass: Record<NonNullable<ContainerProps["size"]>, string> = {
  small: "p-2",
  medium: "p-4",
  large: "p-8",
};

export const Container = ({ children, size = "medium", className = "" }: ContainerProps) => {
  return <div className={`${sizeClass[size]} ${className}`}>{children}</div>;
};
