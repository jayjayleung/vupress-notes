---
title: linux安装docker
date: 2022-04-02 21:11:51
tags: docker
categories: linux
contact: linux/docker
sidebar: auto
---

# CentOS Docker 安装

1、Docker 要求 CentOS 系统的内核版本高于 3.10 ，查看本页面的前提条件来验证你的CentOS 版本是否支持 Docker 。

Docker 支持以下的 64 位 CentOS 版本：

- CentOS 7
- CentOS 8
- 更高版本...



## 使用官方安装脚本自动安装

安装命令如下：

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用国内 daocloud 一键安装命令：

```shell
curl -sSL https://get.daocloud.io/docker | sh
```



## 手动安装

### 卸载旧版本

较旧的 Docker 版本称为 docker 或 docker-engine 。如果已安装这些程序，请卸载它们以及相关的依赖项。

```shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 安装 Docker 

### 使用 Docker 仓库进行安装

在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库。之后，您可以从仓库安装和更新 Docker。

**设置仓库**

安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

使用以下命令来设置稳定的仓库。

使用官方源地址（可能比较慢）

```shell
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

可以选择国内的一些源地址：

阿里云

```shell
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

清华大学源

```shell
sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

### 安装 Docker Engine-Community

安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：

```shell
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

如果提示您接受 GPG 密钥，请选是。

**有多个 Docker 仓库吗？**

如果启用了多个 Docker 仓库，则在未在 yum install 或 yum update 命令中指定版本的情况下，进行的安装或更新将始终安装最高版本，这可能不适合您的稳定性需求。

Docker 安装完默认未启动。并且已经创建好 docker 用户组，但该用户组下没有用户。

**要安装特定版本的 Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：**

1、列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。

```shell
yum list docker-ce --showduplicates | sort -r
```

```shell
docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
```

2、通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。

```shell
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

### 启动 Docker

```shell
sudo systemctl start docker
```

加入开机启动

```shell
sudo systemctl enable docker
```



通过运行 hello-world 映像来验证是否正确安装了 Docker Engine-Community 。

```shell
sudo docker run hello-world
```

### 卸载 docker

删除安装包：

```shell
yum remove docker-ce
```

删除镜像、容器、配置文件等内容：

```shell
rm -rf /var/lib/docker
```



### 小知识



#### 设置docker容器日志大小（全局设置）

每个容器的日志默认都会以 json-file 的格式存储于`/var/lib/docker/containers/<容器id>/<容器id>-json.log` 下,容器销毁后`/var/lib/docker/containers/<容器id>/`目录会被自动删除，所以容器日志也被一并删除。如果容器一直运行并且一直产生日志，容器日志会导致磁盘空间爆满，解决方法如下：



新建`/etc/docker/daemon.json`，若有就不用新建了。添加log-dirver和log-opts参数，如下：

**

```
# vim /etc/docker/daemon.json

{
  "registry-mirrors": ["http://f613ce8f.m.daocloud.io"],
  "log-driver":"json-file",
  "log-opts": {"max-size":"500m", "max-file":"3"}
}
复制代码
```

- `max-size=500m`，意味着一个容器日志大小上限是500M
- `max-file=3`，意味着一个容器最多有三个日志，分别是：`容器id-json.log、容器id-json.log.1、容器id-json.log.2`, 当日志文件的大小达到500m时，自动划分文件保存，最多划分3个文件
- 这两个参数设置之后说明，一个容器最多保存1500m(3 * 500)日志，超过范围的日志不会被保存，文件中保存的是最新的日志，文件会自动滚动更新。

**

```
# 重启docker守护进程
systemctl daemon-reload
# 重启docker
systemctl restart docker
复制代码
```

> **注意：设置的日志大小，只对新建的容器有效。**

设置完成之后，需要删除容器，并重新启动容器。
