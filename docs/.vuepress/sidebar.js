const { createSideBarConfig } = require('./utils')
const JAVA_PATH = '/java/'
const LINUX_PATH = '/linux/'
const DOCKER_PATH = '/linux/docker/'
const FTP_PATH = '/linux/ftp/'
const JENKINS_PATH = '/linux/jenkins/'


module.exports = {
  JAVA_PATH: [createSideBarConfig('java', JAVA_PATH)],
  LINUX_PATH: [createSideBarConfig('linux', LINUX_PATH)],
  DOCKER_PATH: [createSideBarConfig('docker', DOCKER_PATH)],
  FTP_PATH: [createSideBarConfig('ftp', FTP_PATH)],
  JENKINS_PATH: [createSideBarConfig('jenkins', JENKINS_PATH)],
}
/*
module.exports = {
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
*/
/*
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
*/