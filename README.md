# jsx-to-xml

[![Build Status](https://github.com/k-yle/jsx-to-xml/workflows/CI/badge.svg)](https://github.com/k-yle/jsx-to-xml/actions)
[![npm version](https://badge.fury.io/js/jsx-to-xml.svg)](https://npm.im/jsx-to-xml)
[![npm](https://img.shields.io/npm/dt/jsx-to-xml.svg)](https://npm.im/jsx-to-xml)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/jsx-to-xml)

Tiny package to stringify a JSX tree into XML/HTML. 0.6kB and no dependencies.

## Example

```jsx
const feedTitle = 'My RSS Feed';

const Item = ({ name }) => <>Hi {name}</>;

const xml = (
  <rss version={2}>
    <title>{feedTitle}</title>
    <Item name="bob" />
  </rss>
);

console.log(xml);
// prints: '<rss version="2"><title>My RSS Feed</title>Hi bob</rss>'
```

## Install

```sh
npm install -S jsx-to-xml
```

## Setup

If you want to use this library to transform every `.jsx`/`.tsx` file in your repository, then you can add the following to your [tsconfig.json](./tsconfig.json) file:

```diff
{
  "compilerOptions": {
+   "jsx": "react-jsx",
  }
}
```

Alternatively, you can apply this library to specific `.jsx`/`.tsx` files only, by adding the following comment to the top of the file:

```diff
+ /* @jsxImportSource jsx-to-xml */
```

## Special Cases

- You can use [JSX fragments](https://react.dev/reference/react/Fragment), they will not appear in the output
- You can import `Comment` and use `<Comment>…</Comment>`, which will get converted into `<!--…-->`
- You can import `CData` and use `<CData>…</CData>`, which will get converted into `<![CDATA[…]]>`

## Type Safety

To create TypeScript definitons for every component that you use, create a new file (for example `global.def.ts`), and include the following content:

```ts
/** @internal */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // list your components and their propsx here:
      example: { a?: string; b?: number; c?: boolean };
      rect: { width: number; height: number };
    }
  }
}

export {};
```

The example above defines two components: `<example />` and `<rect />`, with a mix of optional and required props.

If you're creating a library, you should normally include `/** @internal */` above the `declare global { … }` block, and enable [`stripInternal`](https://typescriptlang.org/tsconfig/#stripInternal) in [tsconfig.json](./tsconfig.json), so that these global types are not available to anyone consuming your library.
