import SideBar from "@/layout/sidebar/SideBar";
import CalendarContainer from "@/components/calendar/calendar-container";
import Layout from "@/layout/layout";

function App() {
  return (
    <Layout>
      <SideBar />
      <CalendarContainer eventsData={[]} />
    </Layout>
  );
}

export default App
