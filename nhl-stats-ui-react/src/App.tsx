import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { InfrastructurePage } from "./app/infrastructure/containers/InfrastructurePage";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";

const App = () => {
    return (
        <div className="app">
            <NavigationHeader />
            <DashboardContainer />
            <InfrastructurePage />
        </div>
    );
};

export default App;
