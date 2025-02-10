import hre from 'hardhat';
const { viem } = hre;

export class Airdrop {
  public address: `0x${string}` = '0x';

  constructor(
    private hashedMessage: `0x${string}`,
    private verifierAddress: `0x${string}`,
    public merkleTreeRoot: `0x${string}`,
    private amount: string,
  ) {}

  async deploy() {
    const airdrop = await viem.deployContract('AD', [
      this.merkleTreeRoot,
      this.hashedMessage,
      this.verifierAddress,
      '3500000000000000000000',
    ]);
    this.address = airdrop.address;
  }

  async contract() {
    return await viem.getContractAt('AD', this.address);
  }
}
