
/**
 * Use to round a `num` to `dec` th decimal.
 * @param address
 * @param startLength
 * @param endLength
 * @returns string
 */
function censorAddress(
  address: string,
  startLength = 6,
  endLength = 4
): string {
  if (!address || typeof address !== "string") return "";

  // Ensure the address is long enough
  if (address.length <= startLength + endLength) return address;

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

// split token by balance
function splitTokenByBalance(balance: number) {

}

/**
 * Use to create transaction from TxBytes
 * @param txBytes
 * @returns
 */
function createTransactionFromTxBytes(txBytes: string) {
  // const txb = fromBase64(txBytes);
  // const txn = Transaction.from(txb);
// change here
  return "txn";
}

export const WalletUtils = {
  censorAddress,
  splitTokenByBalance,
  createTransactionFromTxBytes,
};
