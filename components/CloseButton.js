"use client";

import Image from "next/image";

export default function CloseButton({ icon, className, alt, onClick }) {
  return (
    <div className="close">
      <button type="button" className="border-0 bg-transparent p-0" onClick={onClick}>
        <Image
          src={icon}
          className={className}
          alt={alt}
          width={26}
          height={26}
        />
      </button>
    </div>
  );
}
