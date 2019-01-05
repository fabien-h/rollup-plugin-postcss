(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('At root.', () => {
    test('Body style at document root.', () => {
      expect(
        postcssImporter.transform(
          `
        > .foo {
          color: #fff;

          @at-root{
              body {
                color: #333;
              }
            }
        }
      `,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_6a78110c', style: `body{color:#333}._6a78110c>.foo{color:#fff}`})",
      });
    });
  });
})();
