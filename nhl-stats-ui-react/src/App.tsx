import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";

const App = () => {
  return (
    <div className="app">
      <NavigationHeader />
      <DashboardContainer />
    </div>
  );
};

export default App;
