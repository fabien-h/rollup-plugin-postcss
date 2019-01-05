(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('SCSS capabilities.', () => {
    test('Nesting', () => {
      expect(
        postcssImporter.transform(
          `
        .foo {
          color: #fff;

          > .bar {
            color: #000;
          }
        }
      `,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_49352362', style: `._49352362 .foo{color:#fff}._49352362 .foo>.bar{color:#000}`})",
      });
    });

    test('Variables', () => {
      expect(
        postcssImporter.transform(
          `
          $fooColor: #fff;
        .foo {
          color: $fooColor;
        }
      `,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_2cbd8dd1', style: `._2cbd8dd1 .foo{color:#fff}`})",
      });
    });
  });
})();
