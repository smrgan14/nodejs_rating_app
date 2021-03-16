module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: 'airbnb-base',
    rules: {
      'no-console': ['off'],
      'import/extensions': ['error', 'always', {
        'js': 'never'
      }],
      'import/no-extraneous-dependencies': ['error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'linebreak-style':  ['error', 'windows'],
    },
  };