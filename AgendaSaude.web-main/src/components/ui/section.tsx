// components/Section.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Link {
  label: React.ReactNode;
  href: string;
}
interface SectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  links: Link[];
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  imageSrc,
  links,
  children
}) => {
  return (
    <section className="my-8 container">
      <div className="flex items-start">
        <div className="mr-20">
          <Image
            src={imageSrc}
            alt={title}
            className="w-full h-full"
            width={300}
            height={300}
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl sm:text-4xl font-bold text-black-800 pb-8 font-mono">
            {title}
          </h2>
          <p className="text-black-600 font-mono text-xl font-medium mb-10">
            {description}
            <span className="flex flex-row">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="pt-5 mr-10 mt-4 hover:text-blue-500"
                >
                  {link.label}
                </a>
              ))}
            </span>
          </p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
};

export default Section;
