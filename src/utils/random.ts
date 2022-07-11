// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const random = <T extends any[]>(array: T) =>
  array[Math.floor(Math.random() * array.length)]
