module.exports = {
  title: 'JayJay\'s Blog',
  description: 'good good study, day day up',
  base: '/',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    // 导航栏设置
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js')
  },
  /*
  plugins: [
    ['vuepress-plugin-helper-live2d', {
      // 是否开启控制台日志打印(default: false)
      log: false,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)>>>取值请参考：
        // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
        model: 'hibiki',
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135)
          height: 300, // 模型的高度(default: 300)
          hOffset: 65, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
    }]
  ],
  */
}
/*
module.exports = {
  title: 'JayJay\'s blog',
  description: 'good good study,day day up',
   // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/web_accumulate/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  theme: 'reco',
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
	nav:[
      { text: '主页', link: '/' }, // 内部链接 以docs为根目录
      { text: 'Java', link: '/java/' }, // 内部链接 以docs为根目录
      { text: 'linux', link: '/linux/' }, // 内部链接 以docs为根目录
      { text: '掘金', link: 'https://juejin.cn/user/1583723129876158' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/jayjayleung' },
        ]
      }        
    ],
	sidebar: {
		'/java/':[
			{
				title: 'java',
				path: '/',
				collapsable: false, // 不折叠
				children: [
					{ title: "学前必读", path: "/" }
				]
			},
			{
			  title: "linux",
			  path: '/linux/docker/docker-install',
			  collapsable: false, // 不折叠
			  children: [
				{ title: "centos7安装docker", path: "/linux/docker/docker-install" },
				{ title: "centos7安装mysql", path: "/linux/docker//linux/docker/docker-install" }
			  ],
			}
		],
		'/linux/':[
			{
				title: '欢迎学习',
				path: '/',
				collapsable: false, // 不折叠
				children: [
					{ title: "学前必读", path: "/" }
				]
			},
			{
			  title: "linux",
			  path: '/linux/docker/docker-install',
			  collapsable: false, // 不折叠
			  children: [
				{ title: "centos7安装docker", path: "/linux/docker/docker-install" },
				{ title: "centos7安装mysql", path: "/linux/docker//linux/docker/docker-install" }
			  ],
			}
		]
	}
  }
  
  themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: 'goddits JavaScript 博客', 
                items: [
                    { text: 'Github', link: 'https://github.com/goddits' },
                    { text: '掘金', link: 'https://juejin.cn/user/1583723129876158' }
                ]
            }
        ]
    },
	
}
*/