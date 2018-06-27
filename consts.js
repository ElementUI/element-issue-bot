exports.headers = {
  'Authorization': `token ${ process.env.BOT_TOKEN }`,
  'User-Agent': 'element-bot'
}

exports.comment = {
  close: {
    en: 'Hello, this issue has been closed because it does not conform to our issue requirements. Please submit issues with [issue-generator](https://elementui.github.io/issue-generator/#/en-US). More info can be found in #3693.',
    cn: '你好，因为本 issue 不符合我们的规范，所以被关闭了。请使用 [issue-generator](https://elementui.github.io/issue-generator/#/zh-CN) 提交 issue。相关信息：#3692。'
  },
  featureReference: {
    en: 'Hi, could you provide a reference for this feature / component?',
    cn: 'Hi，请问能否提供这个功能或组件的参考链接？'
  },
  faq: {
    en: 'Hi, please read the [FAQ](https://github.com/ElemeFE/element/blob/master/FAQ.md) before submitting an issue. The answer to this question can be found there.',
    cn: 'Hi，提交 issue 前请仔细阅读 [FAQ](https://github.com/ElemeFE/element/blob/master/FAQ.md)，这个问题可以在 FAQ 中找到答案。'
  },
  invalidFiddle: {
    en: 'Hi, your JSFiddle page is blank because it seems you forgot to click the `Save` button. Please save your fiddle and then edit this issue with the new link.',
    cn: 'Hi，你的 JSFiddle 页打开之后是空白，很有可能是没有点击页面上的 `Save` 按钮。请点击按钮保存你的 demo，然后编辑这个 issue，附上你的新链接。'
  },
  windowsBug: {
    en: 'Hi, does this problem only occur in Windows? Have you tried reproducing it in a macOS machine?',
    cn: 'Hi，请问这个问题只会在 Windows 系统的浏览器中重现吗？有没有试过在 macOS 下重现这个问题？'
  },
  encourageEnglish: {
    cn: '为了让更多的人能够理解你的问题，同时给遇到相同问题的人提供更好的参考，请尽量使用英语提交你的 issue。相关信息：#4396。'
  }
}

exports.assignees = {
  'component: message-box': 'ziyoung',
  'component: popover': 'ziyoung',
  'component: dropdown': 'ziyoung',
  'component: input-number': 'ziyoung',
  'component: autocomplete': 'ziyoung',
  'component: tooltip': 'ziyoung',
  'component: cascader': 'ziyoung',
  'component: form': 'ziyoung',
  'component: tree': 'ziyoung',
  'component: slider': 'jikkai',
  'component: switch': 'jikkai',
  'component: color-picker': 'jikkai',
  'component: radio': 'jikkai',
  'component: checkbox': 'jikkai',
  'component: tabs': 'jikkai',
  'component: collapse': 'jikkai',
  'component: menu': 'jikkai',
  'component: table': 'jikkai'
}
