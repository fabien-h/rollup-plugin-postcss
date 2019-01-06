(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('At root.', () => {
    test('Body style at document root.', async () => {
      expect(
        await postcssImporter.transform(
          ` .foo {
              color: #fff;

              @at-root{
                body {
                  color: #333;
                }
              }
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_540673cd', styles: `body{color:#333}.foo{color:#fff}`})",
      });
    });
  });
})();
