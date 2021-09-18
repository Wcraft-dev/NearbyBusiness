export type WithChildren<T = {}> = T & {
  children?: React.ReactElement<any, any>;
};
