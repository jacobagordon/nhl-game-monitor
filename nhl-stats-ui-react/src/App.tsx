import { Route, Routes } from "react-router-dom";
import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";
import { InfrastructurePage } from "./app/infrastructure/components/InfrastructurePage";

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
