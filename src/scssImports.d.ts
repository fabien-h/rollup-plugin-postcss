import { ITranspiledSASS } from './types';

declare module '*.scss' {
  const content: ITranspiledSASS;
  export default content;
}
