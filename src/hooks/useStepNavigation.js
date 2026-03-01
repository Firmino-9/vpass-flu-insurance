import { useCallback } from 'react';

export function useStepNavigation(dispatch, currentStep) {
  const goNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const goPrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const goToStep = useCallback((step) => {
    dispatch({ type: 'SET_STEP', payload: step });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  return { goNext, goPrev, goToStep };
}
