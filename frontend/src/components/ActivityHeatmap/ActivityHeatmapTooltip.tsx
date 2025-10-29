import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  content: string;
  children: React.ReactNode;
};

export const ActivityHeatmapTooltip: React.FC<Props> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const tooltip =
    visible && coords
      ? createPortal(
          <div
            style={{
              position: "absolute",
              top: coords.top - 40,
              left: coords.left,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
            className="whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-sky-100 shadow-md"
          >
            {content}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={ref} className="inline-block relative" onMouseEnter={show} onMouseLeave={hide}>
        {children}
      </div>
      {tooltip}
    </>
  );
};
