interface EthereumProvider {
  isMetaMask?: boolean;
  request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
}

interface Window {
  ethereum?: EthereumProvider;
}