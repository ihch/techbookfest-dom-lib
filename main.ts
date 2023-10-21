/// <reference lib="dom" />

type TagName = keyof HTMLElementTagNameMap;
type Props = { [key: string]: any };

type TfElement = {
  type: TagName;
  props: Props | null;
  children?: (TfElement | string)[];
};

type TfChildlen = NonNullable<TfElement["children"]>;

export type FunctionComponent = <T>(
  props: T,
  ...children: TfChildlen
) => TfElement;

function isFunctionComponent(
  type: Parameters<typeof createElement>[0],
): type is FunctionComponent {
  return typeof type === "function";
}

export function createElement(
  type: TagName | FunctionComponent,
  props: Props | null,
  ...children: TfChildlen
): TfElement {
  if (isFunctionComponent(type)) {
    return type(props, ...children);
  }

  return {
    type,
    props,
    children,
  };
}

export function render(
  node: TfElement,
  parentDom: Element,
): Element {
  const element = document.createElement(node.type);

  Object.entries(node.props || {}).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  node.children?.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
      return;
    }
    render(child, element);
  });

  parentDom.append(element);

  return parentDom;
}
