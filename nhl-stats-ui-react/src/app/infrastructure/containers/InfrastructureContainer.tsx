import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { InfrastructureHealthCard } from "../components/InfrastructureHealthCard";
import {
    selectInfrastructureCheckedAtUtc,
    selectInfrastructureComponents,
    selectInfrastructureError,
    selectInfrastructureIsLoading,
    selectInfrastructureStatus,
} from "../selectors/infrastructureSelectors";
import { fetchInfrastructureHealth } from "../slices/infrastructureSlice";
import {
    StyledInfrastructureGrid,
    StyledInfrastructureHeader,
    StyledInfrastructurePage,
    StyledInfrastructureSubtitle,
    StyledInfrastructureTitle,
} from "../styles/Infrastructure.style";

export const InfrastructureContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector(selectInfrastructureStatus);
    const components = useSelector(selectInfrastructureComponents);
    const checkedAtUtc = useSelector(selectInfrastructureCheckedAtUtc);
    const isLoading = useSelector(selectInfrastructureIsLoading);
    const error = useSelector(selectInfrastructureError);

    useEffect(() => {
        dispatch(fetchInfrastructureHealth());
    }, [dispatch]);

    return (
        <StyledInfrastructurePage>
            <StyledInfrastructureHeader>
                <StyledInfrastructureTitle>Infrastructure</StyledInfrastructureTitle>
                <StyledInfrastructureSubtitle>
                    Overall status: {status}
                    {checkedAtUtc
                        ? ` · Last checked: ${new Date(checkedAtUtc).toLocaleString()}`
                        : ""}
                </StyledInfrastructureSubtitle>
            </StyledInfrastructureHeader>

            {isLoading && (
                <StyledInfrastructureSubtitle>
                    Loading infrastructure health...
                </StyledInfrastructureSubtitle>
            )}

            {error && <StyledInfrastructureSubtitle>{error}</StyledInfrastructureSubtitle>}

            {!isLoading && !error && (
                <StyledInfrastructureGrid>
                    {components.map(component => (
                        <InfrastructureHealthCard key={component.name} component={component} />
                    ))}
                </StyledInfrastructureGrid>
            )}
        </StyledInfrastructurePage>
    );
};
