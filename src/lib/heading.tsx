
import React from 'react';

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

export default function SectionHeader({ title, highlightedText, description }: SectionHeaderProps) {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-4xl font-medium text-secondary mb-4">
          {title} <span className="text-primary">{highlightedText}</span>
        </h2>
        <p className="text-[20px] text-secondary max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}