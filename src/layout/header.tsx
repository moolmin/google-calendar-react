import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <div className="mx-3 flex justify-between items-center py-4">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}
