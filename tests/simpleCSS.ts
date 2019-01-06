(() => {
  const postcssImporter = require('../dist/index.umd.js')();

  describe('Simple css.', () => {
    test('Most basic example.', async () => {
      expect(
        await postcssImporter.transform(`.foo { color: #fff; }`, 'styles.scss'),
      ).toEqual({
        code:
          "export default ({hash: '_5a68bd9c', styles: `.foo { color: #fff; }`})",
      });
    });

    test('Scopped CSS.', async () => {
      expect(
        await postcssImporter.transform(
          `.__SCOPE{ .foo { color: #fff; } }`,
          'styles.scss',
        ),
      ).toEqual({
        code:
          "export default ({hash: '_9eba5c56', styles: `._9eba5c56 .foo { color: #fff; }`})",
      });
    });
  });
})();
