(() => {
  const postcssImporter = require('../dist/index.umd.js')();

  describe('Simple css.', () => {
    test('Most basic example', () => {
      expect(
        postcssImporter.transform(`.foo { color: #fff; }`, 'styles.scss'),
      ).toEqual({
        code:
          "export default ({hash: '_5a68bd9c', style: `._5a68bd9c .foo { color: #fff; }`})",
      });
    });
  });
})();
