import { match } from "assert";

var unicodeRegExp =
    /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
// var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeRegExp.source + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp("^<" + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
var attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// var doctype = /^<!DOCTYPE [^>]+>/i;
// var comment = /^<!\--/;
// var conditionalComment = /^<!\[/;
let root = null; //ast语法树树根
let currentParent;
let stack = [];
const ELEMENT_TYPE = 1; //元素
const TEXT_TYPE = 3; //文本

function createASTElement(tagName, attrs) {
    return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs,
        parent: null
    }
}

function start(tagName, attrs) {
    // console.log("开始标签:", tagName, "属性是:", attrs);
    let element = createASTElement(tagName, attrs);
    if (!root) {
        root = element;
    }
    currentParent = element;
    stack.push(element)//开始标签存放到栈中
}
function end(tagName) {
    // console.log("结束标签:", tagName);
    let element = stack.pop();
    currentParent = stack[stack.length - 1]
    if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
    }

}
function chars(text) {
    // console.log("文本是:", text);
    text = text.replace(/\s/g, '');
    if (text) {
        currentParent.children.push({
            text,
            type: TEXT_TYPE
        })
    }
}
function parseHTML(html) {
    //这里复杂情况没有做，注释节点等
    while (html) {
        let textEnd = html.indexOf("<");
        if (textEnd == 0) {
            let startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }
        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length);
            chars(text);
        }
    }
    function advance(n) {
        html = html.substring(n);
    }
    function parseStartTag() {
        let start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
            };
            advance(start[0].length);
            let end, attr;
            while (
                !(end = html.match(startTagClose)) &&
                (attr = html.match(attribute))
            ) {
                advance(attr[0].length);
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5],
                });
            }
            if (end) {
                advance(end[0].length);
                return match;
            }
        }
    }
    return root;
}
function genProps(attrs){
    let str = '';
}
function generate(el){
    let code = `_c("${el.tag}",${
        el.attrs.length?genProps(el.attrs):'undefined'
    })
    `
    return code;
}
export function compileToFunction(template) {
    //解析html字符串，再解析成ast
    let root = parseHTML(template);

    //将ast再次转化成js的语法
    let code = generate(root)
    console.log(code)
    return function render() { };
}

// template
// {
    /* <div id='app'>
      <p>hello</p>
  </div>
  
  // =>
  
  let root = {
      tag: 'div',
      attrs: [{ name: 'id', value: 'app' }],
      parent: null,
      type: 1,
      children: {
          tag: 'p',
          attrs: [],
          parent: root,
          type: 1,
          children: [{
              text: 'hello',
              type: 3
          }]
      }
  } */
// }
