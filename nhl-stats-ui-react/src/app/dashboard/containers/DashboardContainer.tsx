import { connect } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { DashboardPage } from "../components/DashboardPage";
import {
    selectDashboardError,
    selectDashboardIsLoading,
    selectDashboardSummary,
} from "../selectors/dashboardSelectors";
import { fetchDashboardSummary } from "../slices/dashboardSlice";

const mapStateToProps = (state: RootState) => ({
    summary: selectDashboardSummary(state),
    isLoading: selectDashboardIsLoading(state),
    error: selectDashboardError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchDashboardSummary: () => dispatch(fetchDashboardSummary()),
});

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
