import { Route, Routes } from "react-router-dom";
import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";
import { InfrastructureContainer } from "./app/infrastructure/containers/InfrastructureContainer";

const App = () => {
    return (
        <div className="app">
            <NavigationHeader />
            <Routes>
                <Route path="/" element={<DashboardContainer />} />
                <Route path="/infrastructure" element={<InfrastructureContainer />} />
            </Routes>
        </div>
    );
};

export default App;
