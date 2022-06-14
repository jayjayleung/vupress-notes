module.exports = [
      { text: '主页', link: '/' }, // 内部链接 以docs为根目录
      { text: 'Java', link: '/java/' }, // 内部链接 以docs为根目录
      { 
		text: 'linux', 
		items: [
			{
				text: 'docker',
				//link:'/linux/docker/'
				items:[
					{text: 'docker安装', link:'/linux/docker/'}
				]
			},
			{text: 'ftp', link:'/linux/ftp/'},
			{text: 'jenkins', link:'/linux/jenkins/'},
		]
	  }, // 内部链接 以docs为根目录
      { text: '掘金', link: 'https://juejin.cn/user/1583723129876158' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/jayjayleung' },
        ]
      }        
    ];
/*
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
*/