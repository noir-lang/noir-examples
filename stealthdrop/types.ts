export interface Step {
  title: string;
  description: string;
}

export interface StepProps extends Step {
  isOpen: boolean;
  onToggle: () => void;
  number: number;
  onContinue?: () => void;
  isCompleted?: boolean;
}

export interface WalletConnectionStepProps extends StepProps {
  isConnected: boolean;
}
