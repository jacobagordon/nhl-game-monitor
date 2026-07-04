import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import {
  selectInfrastructureCheckedAtUtc,
  selectInfrastructureComponents,
  selectInfrastructureError,
  selectInfrastructureIsLoading,
  selectInfrastructureStatus,
} from "../selectors/infrastructureSelectors";
import { fetchInfrastructureHealth } from "../slices/infrastructureSlice";

export function InfrastructurePage() {
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
    <div>
      <h1>Infrastructure</h1>

      {isLoading && <p>Loading infrastructure health...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <>
          <p>Overall Status: {status}</p>

          {checkedAtUtc && <p>Last Checked: {checkedAtUtc}</p>}

          <ul>
            {components.map(component => (
              <li key={component.name}>
                {component.name}: {component.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
