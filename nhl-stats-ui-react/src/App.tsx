import { Route, Routes } from "react-router-dom";
import { DashboardContainer } from "./app/dashboard/containers/DashboardContainer";
import { NavigationHeader } from "./app/navigation/containers/NavigationHeader";
import { InfrastructureContainer } from "./app/infrastructure/containers/InfrastructureContainer";
import { GamesPage } from "./app/games/components/GamesPage";

const App = () => {
    return (
        <div className="app">
            <NavigationHeader />
            <Routes>
                <Route path="/" element={<DashboardContainer />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/infrastructure" element={<InfrastructureContainer />} />
            </Routes>
        </div>
    );
};

export default App;
