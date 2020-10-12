// https://github.com/i18next/react-i18next/blob/master/src/index.d.ts

import { React } from '../../../mod.ts';

export type Namespace = string | string[];

export interface TransProps<E extends Element = HTMLDivElement>
  extends React.HTMLProps<E> {
  children?: React.ReactNode;
  components?: readonly React.ReactNode[] | { [tagName: string]: React.ReactNode };
  count?: number;
  defaults?: string;
  i18n?: any;
  i18nKey?: string;
  ns?: Namespace;
  parent?: string | React.ComponentType<any> | null; // used in React.createElement if not null
  tOptions?: {};
  values?: {};
  t?: any;
}
export function Trans<E extends Element = HTMLDivElement>(props: TransProps<E>): React.ReactElement;
