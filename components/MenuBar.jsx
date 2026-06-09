"use client";
import React from "react";
import Image from "next/image";

const MenuBar = () => {
  return (
    <div className="menuTop_login">
      <div className="amsterdam_logo_login_l">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </div>
      <div className="artinamsterdam_login">
        <Image
          src="/images/artinamsterdam_black_2.png"
          alt="Art in Amsterdam"
          width={240}
          height={20}
          style={{ width: "240px", height: "auto" }}
        />
      </div>
      <div className="amsterdam_logo_login_r">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default MenuBar;
