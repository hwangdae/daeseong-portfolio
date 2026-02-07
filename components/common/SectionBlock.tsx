import React from "react";

const SectionBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-12">
      <h2 className="typo-section-subtitle mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default SectionBlock;
