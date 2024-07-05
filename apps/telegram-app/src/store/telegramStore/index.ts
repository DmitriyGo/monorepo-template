import { create } from 'zustand';

export enum TGValidationFailReason {
  DATA_OUTDATED = 'DATA_OUTDATED',
  INVALID_HASH = 'INVALID_HASH',
}

export interface ValidationResult {
  isValid: boolean;
  reason?: TGValidationFailReason;
}

interface TelegramStoreState {
  validationResult: ValidationResult;
  setValidationResult: (result: ValidationResult) => void;
}

export const useTelegramStore = create<TelegramStoreState>(set => ({
  validationResult: { isValid: false },
  setValidationResult: (result: ValidationResult) => set({ validationResult: result }),
}));
