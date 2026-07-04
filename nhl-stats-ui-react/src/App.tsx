import { Route, Routes } from "react-router-dom";
import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { InfrastructurePage } from "./app/infrastructure/containers/InfrastructurePage";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";

const App = () => {
    return (
        <div className="app">
            <NavigationHeader />
            <Routes>
                <Route path="/" element={<DashboardContainer />} />
                <Route path="/infrastructure" element={<InfrastructurePage />} />
            </Routes>
        </div>
    );
};

export default App;
