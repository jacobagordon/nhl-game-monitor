import { connect } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { DashboardPage } from "../components/DashboardPage";
import {
    selectDashboardError,
    selectDashboardIsLoading,
    selectDashboardSummary,
    selectRecentGames,
    selectRecentGamesError,
    selectRecentGamesIsLoading,
    selectTopPerformers,
    selectTopPerformersError,
    selectTopPerformersIsLoading,
} from "../selectors/dashboardSelectors";
import {
    fetchDashboardSummary,
    fetchRecentGames,
    fetchTopPerformers,
} from "../slices/dashboardSlice";

const mapStateToProps = (state: RootState) => ({
    summary: selectDashboardSummary(state),
    isLoading: selectDashboardIsLoading(state),
    error: selectDashboardError(state),
    recentGames: selectRecentGames(state),
    isRecentGamesLoading: selectRecentGamesIsLoading(state),
    recentGamesError: selectRecentGamesError(state),
    topPerformers: selectTopPerformers(state),
    isTopPerformersLoading: selectTopPerformersIsLoading(state),
    topPerformersError: selectTopPerformersError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchDashboardSummary: () => dispatch(fetchDashboardSummary()),
    fetchRecentGames: () => dispatch(fetchRecentGames()),
    fetchTopPerformers: () => dispatch(fetchTopPerformers()),
});

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
