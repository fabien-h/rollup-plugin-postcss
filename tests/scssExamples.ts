(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('SCSS capabilities.', () => {
    test('Nesting.', async () => {
      expect(
        await postcssImporter.transform(
          ` .foo {
              color: #fff;
              
              > .bar {
                color: #000;
              }
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_84150551', styles: `.foo{color:#fff}.foo>.bar{color:#000}`})",
      });
    });

    test('Scopped nesting.', async () => {
      expect(
        await postcssImporter.transform(
          ` .__SCOPE{
              .foo {
                color: #fff;
                
                > .bar {
                  color: #000;
                }
              }
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_5fef23d0', styles: `._5fef23d0 .foo{color:#fff}._5fef23d0 .foo>.bar{color:#000}`})",
      });
    });

    test('Variables', async () => {
      expect(
        await postcssImporter.transform(
          ` $fooColor: #fff;
            .foo {
              color: $fooColor;
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_dbcba6d2', styles: `.foo{color:#fff}`})",
      });
    });
  });
})();
