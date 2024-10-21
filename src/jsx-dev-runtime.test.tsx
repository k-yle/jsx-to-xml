/* @jsxImportSource . */
/* eslint-disable react/jsx-key, react/jsx-no-useless-fragment, react/no-unknown-property */
import { describe, expect, it } from 'vitest';
import { CData, Comment } from './jsx-dev-runtime';

/** @internal - this should NOT be published to npm */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      example: { a?: string; b?: number; c?: boolean; key?: string };
      br: IntrinsicElements['example'];
    }
  }
}

describe('jsx', () => {
  it('can convert JSX to XML', () => {
    const Custom = ({ a, children }: { a: string; children?: unknown }) => (
      <example a={a}>“{children}”</example>
    );

    expect(
      (
        <example a="hello">
          <br a="stmt" b={1} c={false} />
          <>Hi</>
          <>
            hello <>fragment</>
          </>
          {[<br a="stmt" b={2} />, <br c b={3} />, <CData>1&lt;2</CData>]}
          <>
            <example key="this should be ignored">aaaa</example>
            <Custom a="child">123</Custom>
            <Custom a="no child" />
            <example>bbbb</example>
            <Custom a="1">{[<Custom a="2">3</Custom>, <>4</>]}</Custom>
            <Comment> this is a comment </Comment>
            <Comment>no whitespace</Comment>
          </>
        </example>
      ).replaceAll('><', '>\n<'),
    ).toMatchInlineSnapshot(
      `
      "<example a="hello">
      <br a="stmt" b="1" c="false" />Hihello fragment<br a="stmt" b="2" />
      <br c="true" b="3" />
      <![CDATA[1<2]]>
      <example>aaaa</example>
      <example a="child">“123”</example>
      <example a="no child">“”</example>
      <example>bbbb</example>
      <example a="1">“<example a="2">“3”</example>4”</example>
      <!-- this is a comment -->
      <!--no whitespace-->
      </example>"
    `,
    );
  });
});
