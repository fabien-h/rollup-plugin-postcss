(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('Error.', () => {
    test('Generate a syntax error.', async () => {
      expect(
        await postcssImporter.transform(
          ` .foo {
              color #fff;
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code: `export default ({
            hash: '',
            styles: '',
            errorName: CssSyntaxError,
            errorReason: Unknown word,
            errorFile: styles.scss,
            errorLine: 2,
            errorColumn: 15,
          })`,
      });
    });
  });
})();
