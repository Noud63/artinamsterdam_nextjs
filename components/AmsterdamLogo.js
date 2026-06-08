"use client";

import Image from "next/image";

export default function AmsterdamLogo({ className }) {
  return (
    <div className={className}>
      <Image
        src="/images/amsterdam_logo_wit.png"
        alt=""
        width={70}
        height={18}
        aria-hidden="true"
        style={{ width: "70px", height: "auto" }}
      />
    </div>
  );
}
