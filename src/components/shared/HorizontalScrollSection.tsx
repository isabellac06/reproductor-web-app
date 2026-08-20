import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const HorizontalScrollSection = ({ title, children }: Props) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="scroll-container flex gap-4 overflow-x-auto">
        {children}
      </div>
    </section>
  );
};
