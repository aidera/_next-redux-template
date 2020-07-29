export const delay = (ms: number): Promise<any> =>
  new Promise((res) => setTimeout(res, ms));
