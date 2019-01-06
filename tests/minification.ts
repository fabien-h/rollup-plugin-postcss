(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('Minification test', () => {
    test('Minified', async () => {
      expect(
        await postcssImporter.transform(
          ` .foo {
              color: #fff;
            }`,
          'styles.scss',
        ),
      ).toEqual({
        code: "export default ({hash: '_486a9c72', style: `.foo{color:#fff}`})",
      });
    });
  });
})();
