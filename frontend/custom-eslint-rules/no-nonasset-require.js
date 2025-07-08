// custom-eslint-rules/no-nonasset-require.js
// ESLint rule: Disallow require() except for asset imports (fonts, images, etc.)

/**
 * @fileoverview Disallow require() except for asset imports in React Native/Expo
 */

const ASSET_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ttf',
  '.otf',
  '.woff',
  '.woff2',
  '.eot',
  '.mp3',
  '.mp4',
  '.wav',
  '.webm',
  '.json',
];

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow require() except for asset imports in React Native/Expo',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'require' &&
          node.arguments.length === 1 &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          const value = node.arguments[0].value;
          const isAsset = ASSET_EXTENSIONS.some((ext) => value.endsWith(ext));
          if (!isAsset) {
            context.report({
              node,
              message:
                'require() is only allowed for importing assets (fonts, images, etc.) in React Native/Expo.',
            });
          }
        }
      },
    };
  },
};
