(() => {
  const postcssImporter = require('../dist/index.umd.js')({
    minified: true,
  });

  describe('Minification test', () => {
    test('Minified', () => {
      expect(
        postcssImporter.transform(
          `
        .foo {
          color: #fff;
        }
      `,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_b65faaa8', style: `._b65faaa8 .foo{color:#fff}`})",
      });
    });
  });
})();
