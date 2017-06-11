module.exports = {
    "parser": "babel-eslint",
    env: {
        "node": true
    },
    root: true,
    parserOptions: {
        "ecmaVersion": 8,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    plugins: [
        'class-property'
    ],
    // add your custom rules here
    'rules': {
        "indent": ["error", 4],
        // allow paren-less arrow functions
        'arrow-parens': 0,
    }
}
