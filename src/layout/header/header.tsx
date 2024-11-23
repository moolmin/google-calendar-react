import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

export default function Header() {
    return (
      <div className="mx-3 flex items-center justify-between py-4 flex-row border-b">
        <HeaderLeft />
        <HeaderRight />
      </div>
    );
  }
  