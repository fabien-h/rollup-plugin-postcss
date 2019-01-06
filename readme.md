<img width="100" height="28" src="https://raw.githubusercontent.com/fabien-h/rollup-plugin-postcss/master/img/acta.png"/>
<img width="256" height="28" src="https://raw.githubusercontent.com/fabien-h/rollup-plugin-postcss/master/img/rollup-postcss.png"/>

# Rollup PostCSS @acta/rollup-plugin-postcss

A rollup plugin to import transpiled styles files as modules with PostCSS.

## Table of Contents

- [Parsing URLs](#parsing-urls)
- [Formating URLs](#formating-urls)
- [Dev scripts](#dev-scripts)

## Use with rollup

Install with `npm i -D @acta/rollup-plugin-postcss`. Then in your config file:

```JavaScript
...
import postCSS from '@acta/rollup-plugin-postcss';
...
  ...
  plugins: [
    ...
    postCSS({
      minified: true,
      includes: ['.sass', '.scss'],
      excludes: ['node_modules'],
      presetEnv: {
        stage: 2,
        features: [],
        browsers: 'defaults',
      }
    }),
    ...
  ],
  ...
```

### Parametters

All parametters are otpionnal.

- `minified`: boolean, should the styles be minified.
- `incldues`: the file complete path (en: `/Volumes/Projects/foo/bar.scss`) contains at least one of the elements of the array. Default value is `['.css', '.pcss', '.sass', '.scss']`.
- `excludes`: the file complete path does not contain any of the elements of the array. Default value is `['node_modules']`.
- `presetEnv`: see <https://github.com/csstools/postcss-preset-env> for complete details.

## Input and output

If you have the following styles file:

```SCSS
$mainColor: #00c;

body {
  color: #000;
}

.__SCOPE {
  color: #c00;

  > .example {
    color: $mainColor;
  }
}
```

And you import them in a JavaScript file with `import AppStyles from './AppStyles.scss';`, you obtain this object:

```JavaScript
{
  hash: '_a7af0989',
  style: `body{
    color:#000
    }
    ._a7af0989{
      color:#c00
    }
    ._a7af0989 > .example{
      color:#00c
    }`
}
```

It should be injected in a `style` tag in your DOM.

> The value of `styles` will be minified if you pass `minified: true` in the options and will be: `body{color:#000}._8fd83ea9dc8f28944de69aac4284bba3{color:#c00}._8fd83ea9dc8f28944de69aac4284bba3>.example{color:#00c}`
