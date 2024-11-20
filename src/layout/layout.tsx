import Header from "@/layout/header/header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <main className="flex flex-row w-full">{props.children}</main>
    </div>
  );
};

export default Layout;
