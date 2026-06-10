
import Image from "next/image";
import Link from "next/link";

const MenuBar = () => {
  return (
    <div className="menuTop_login">
      <Link href="/" className="amsterdam_logo_login_l">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </Link>
       <Link href="/" className="artinamsterdam_login">
        <Image
          src="/images/artinamsterdam_black_2.png"
          alt="Art in Amsterdam"
          width={240}
          height={20}
          style={{ width: "240px", height: "auto" }}
        />
      </Link>
      <Link href="/" className="amsterdam_logo_login_r">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default MenuBar;
