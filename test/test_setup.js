require('babel-register')({
  ignore: /\.sass$/
})

var enzyme = require('enzyme')
var Adapter = require('enzyme-adapter-react-16')
enzyme.configure({ adapter: new Adapter() })

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps (src, target) {
  const props = Reflect.ownKeys(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Reflect.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
