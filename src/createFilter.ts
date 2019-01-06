import { ICreateFilter } from './types';

const typeErrorMessage =
  'Includes and exclude parametters for "rollup-plugin-postcss-importer" must be strings or arrays of strings.';

const createFilter: ICreateFilter = ({ includes = '', excludes = '' }) => {
  /**
   * Hard check on types
   */
  if (typeof includes === 'string') includes = [includes];
  if (typeof excludes === 'string') excludes = [excludes];
  if (!Array.isArray(includes) || !Array.isArray(excludes)) {
    throw new TypeError(typeErrorMessage);
  }

  /**
   * Build the regexes
   */
  const includeElements: Array<string> = [];
  const excludeElements: Array<string> = [];
  for (const include of includes) {
    if (typeof include !== 'string') {
      throw new TypeError(typeErrorMessage);
    }
    includeElements.push(
      `(${include.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})$`,
    );
  }
  for (const exclude of excludes) {
    if (typeof exclude !== 'string') {
      throw new TypeError(typeErrorMessage);
    }
    excludeElements.push(
      `(${exclude.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`,
    );
  }
  const includeRegex = new RegExp(includeElements.join('|'));
  const excludeRegex = new RegExp(excludeElements.join('|'));

  /**
   * Build the filter
   */
  return (id: string) => {
    return includeRegex.test(id) && !excludeRegex.test(id);
  };
};

export default createFilter;
