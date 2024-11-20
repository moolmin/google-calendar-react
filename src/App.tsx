import "./App.css";
import Header from "@/layout/header/header";
import SideBar from "@/layout/sidebar/SideBar";

function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
      </div>
    </div>
  );
}

export default App
