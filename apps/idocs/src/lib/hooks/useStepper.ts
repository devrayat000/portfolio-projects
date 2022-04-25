import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function createStepper(steps: string[]) {
  return function useStepper(key: string) {
    const params = useParams();
    const tab = params[key];

    const navigate = useNavigate();

    const activeStep = steps.indexOf(tab!);

    const nextStep = useCallback(
      () =>
        navigate(
          `../${
            steps[
              activeStep < steps.length - 1
                ? steps.indexOf(tab!) + 1
                : activeStep
            ]
          }`,
          { replace: true }
        ),
      [tab, activeStep, navigate]
    );
    const prevStep = useCallback(
      () =>
        navigate(
          `../${
            steps[
              activeStep < steps.length - 1
                ? steps.indexOf(tab!) - 1
                : activeStep
            ]
          }`,
          { replace: true }
        ),
      [tab, activeStep, navigate]
    );

    const handleStepped = (index: number) => {
      navigate(`../${steps[index]}`, { replace: true });
    };

    return { activeStep, nextStep, prevStep, handleStepped };
  };
}

export const useStepper = createStepper(["demo1", "demo2", "demo3"]);
