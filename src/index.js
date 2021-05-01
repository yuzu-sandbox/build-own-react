/**
 *
 * @param {string} type html tag name example for div, p, h1 and etc...
 * @param {object | null} props
 * @param  {...any} children
 * @returns
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === "object" ? child : createTextElement(child))),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

/**
 *
 * @param {any} element
 * @param {HTMLElement} container
 */
function render(element, container) {
  const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

  const isProperty = (key) => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach((child) => render(child, dom))

  container.appendChild(dom)
}

const Didact = {
  createElement,
  render,
}

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
Didact.render(element, container)
