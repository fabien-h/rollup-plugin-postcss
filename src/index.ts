import { IImporterOptions, IFilter } from './types';
import postcss, { AcceptedPlugin } from 'postcss';
import XXH from 'xxhashjs';
import createFilter from './createFilter';
import cleanCSS from 'clean-css';

/**
 * Default donfiguration
 */
const defaultIncludes: Array<string> = ['.css', '.pcss', '.sass', '.scss'];
const defaultExcludes: Array<string> = ['node_modules'];

const postcssImporter = (options: IImporterOptions = {}) => {
  /* Init the filter */
  const filter: IFilter = createFilter({
    includes: options.includes || defaultIncludes,
    excludes: options.excludes || defaultExcludes,
  });

  /* Init the processor */
  const plugins: Array<AcceptedPlugin> = [
    // Allow scss like variables use $var: value
    // https://github.com/postcss/postcss-simple-vars
    require('postcss-simple-vars'),
    // Fix flexbox bugs
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    require('postcss-flexbugs-fixes'),
    // Reduces calc() to values (when expressions involve the same units).
    // https://github.com/postcss/postcss-calc
    require('postcss-calc'),
    // Allow <= and => statements to media queries
    // https://github.com/postcss/postcss-media-minmax
    require('postcss-media-minmax'),
    // Lets you use the @extend at-rule and Functional Selectors in CSS.
    // https://github.com/jonathantneal/postcss-extend-rule
    require('postcss-extend-rule')(),
    // Add vendor prefixes to CSS rules using values from Can I Use.
    // https://github.com/postcss/autoprefixer
    require('autoprefixer'),
    // The @at-root causes one or more rules to be emitted at the root of the document,
    // rather than being nested beneath their parent selectors
    // https://github.com/OEvgeny/postcss-atroot
    require('postcss-atroot')(),
    // Allow nesting like header { h1 {...} a {...} }
    // https://github.com/postcss/postcss-nested
    require('postcss-nested'),
  ];
  const processor = postcss(plugins);

  /* Init the minifiyer */
  const minifiyer = new cleanCSS();

  /* Return the tranformer */
  return {
    name: 'postcss-transformer',
    transform: (code: string, id: string) => {
      if (!filter(id)) {
        return null;
      }

      try {
        const hash: string = `_${XXH.h32(code, 0xabcd).toString(16)}`;
        let style: string = processor.process(`.${hash}{${code || ''}}`).css;

        /* Optional basic minification ; recommended for production */
        if (options.minified) {
          style = minifiyer.minify(style).styles;
        }

        const output: string = `export default ({hash: '${hash}', style: \`${style}\`})`;

        return {
          code: output,
        };
      } catch (error) {
        console.error('Invalid style file', id);
        console.error(error);
        return {
          code: `export default ({
            hash: '',
            style: '',
            fileError: '${id}',
            error: '${error}'
          })`,
        };
      }
    },
  };
};

export default postcssImporter;
