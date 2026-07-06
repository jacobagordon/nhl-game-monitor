import { connect } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import {
    selectInfrastructureCheckedAtUtc,
    selectInfrastructureComponents,
    selectInfrastructureError,
    selectInfrastructureIsLoading,
    selectInfrastructureStatus,
} from "../selectors/infrastructureSelectors";
import {
    fetchInfrastructureHealth,
    triggerScheduleDateProcessing,
} from "../slices/infrastructureSlice";
import { InfrastructurePage } from "../components/InfrastructurePage";

const mapStateToProps = (state: RootState) => ({
    status: selectInfrastructureStatus(state),
    components: selectInfrastructureComponents(state),
    checkedAtUtc: selectInfrastructureCheckedAtUtc(state),
    isLoading: selectInfrastructureIsLoading(state),
    error: selectInfrastructureError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchInfrastructureHealth: () => dispatch(fetchInfrastructureHealth()),
    triggerScheduleDateProcessing: (date: string) => dispatch(triggerScheduleDateProcessing(date)),
});

export const InfrastructureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InfrastructurePage);
