export interface Step {
  title: string;
  description: string;
}

export type PlumeSignature = {
  nullifier: { toHex: () => string };
  c: string;
  s: string;
  uncompressedPublicKey?: `0x${string}`;
};

export interface StepProps extends Step {
  isOpen: boolean;
  onToggle: () => void;
  number: number;
  onContinue?: () => void;
  isCompleted?: boolean;
  sign?: ({ message, account }: { message: string; account: `0x${string}` }) => void;
  signature?: `0x${string}` | null;
  plumeSign?: (address: `0x${string}`) => Promise<void>;
  plume?: PlumeSignature;
  resetForm?: () => void;
}

export interface StepListProps {
  resetForm: () => void;
  setResetForm: (resetForm: () => void) => void;
}
