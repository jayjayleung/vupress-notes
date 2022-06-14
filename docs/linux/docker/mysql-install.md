---
title: Docker安装MySQL挂载外部配置文件和数据
date: 2021-11-14 21:43:43
tags: docker
categories: linux
contact: linux/docker
sidebar: auto
---

# 背景

使用Docker容器搭建数据库，可以极为方便的移植到其他环境。本文有两种配置方式，一种是在全部文件数据都在容器内部，一种是挂载到外部配置和数据，这要的好处是打包的容器不会随着使用而越来越大。

这里使用的mysql 5.7.36版本，具体需要哪个版本，在[dockerHub][https://hub.docker.com/]搜索查看

# 一、挂载在容器内部配置文件和数据

## docker拉取最新MySQL

```shell
sudo docker pull mysql:5.7.36
sudo docker images //查看是否有镜像
```

## 启动docker，创建MySQL

```shell
sudo docker run --name=mysql -it -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

这里挂载内部文件的就完成了，这种方法最快，但改配置不方便

# 二、挂载外部配置文件和数据

## docker拉取MySQL

```shell
docker pull mysql:5.7.36
```

## 创建配置文件

可以根据需要设置到合适的目录

```shell
mkdir -p /home/mysql/conf
mkdir -p /home/mysql/data
mkdir -p /home/mysql/logs
```

## 创建MySQL配置文件

```shell
vi /home/mysql/conf/my.cnf
```

复制以下内容，为了解决中文乱码问题

```shell
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
character-set-server=utf8 
[client]
default-character-set=utf8 
[mysql]
default-character-set=utf8 
# Custom config should go here
!includedir /etc/mysql/conf.d/
```

## 运行容器

```shell
docker run --restart=always -d -v /home/mysql/conf/my.cnf:/etc/mysql/my.cnf -v /home/mysql/logs:/logs -v /home/mysql/data/mysql:/var/lib/mysql  -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.36

```
参数解释

```shell
--restart=always                                            -> 开机启动容器,容器异常自动重启
-d                                                          -> 以守护进程的方式启动容器
-v /home/app/mysql/conf.d/my.cnf:/etc/mysql/my.cnf          -> 映射配置文件
-v /home/app/mysql/logs:/logs                               -> 映射日志
-v /home/app/mysql/data/mysql:/var/lib/mysql                -> 映射数据
-p 3306:3306                                                -> 绑定宿主机端口
--name mysql                                                -> 指定容器名称
-e MYSQL_ROOT_PASSWORD=123456                               -> 写入配置root密码
```

使用数据连接工具连接(比如Navicat)能连上就表示安装成功了