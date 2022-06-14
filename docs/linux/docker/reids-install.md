---
title: Docker安装并配置Redis
date: 2021-11-14 22:33:21
tags: docker
categories: linux
contact: linux/docker
sidebar: auto
---

# 一、找到一个合适的docker的redis的版本

可以去[docker hub](https://hub.docker.com/_/redis?tab=tags)中去找一下



# 二、使用docker安装redis

```shell
sudo docker pull redis
```

安装好之后使用`docker images`即可查看

```shell
sudo docker images
```

# 三、准备redis的配置文件

因为需要redis的配置文件`redis.conf`，这里最好还是去redis的[官方下载][http://download.redis.io/redis-stable/redis.conf]一个redis使用里面的配置文件即可

或者在linux敲

```shell
wget https://raw.githubusercontent.com/antirez/redis/4.0/redis.conf -O conf/redis.conf
```



# 四、配置redis.conf配置文件

**修改`redis.conf`配置文件：**

主要配置的如下：

```shell
bind 127.0.0.1 #注释掉这部分，使redis可以外部访问
daemonize no#用守护线程的方式启动
requirepass 你的密码#给redis设置密码
appendonly yes#redis持久化　　默认是no
tcp-keepalive 300 #防止出现远程主机强迫关闭了一个现有的连接的错误 默认是300
```

# 五、创建本地与docker映射的目录，即本地存放的位置

创建本地存放redis的位置：

可以自定义，因为我的docker的一些配置文件都是存放在`/data`目录下面的，所以我依然在`/data`目录下创建一个`redis`目录，这样是为了方便后期管理

```shell
mkdir /home/redis
mkdir /home/redis/data
```

把`配置文件`拷贝到刚才创建好的`/home/redis`里

# 六、启动docker redis

```shell
docker run -p 6379:6379 --name redis -v /home/redis/redis.conf:/etc/redis/redis.conf  -v /home/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```

参数解释：

```shell
-p 6379:6379:把容器内的6379端口映射到宿主机6379端口
-v /home/redis/redis.conf:/etc/redis/redis.conf：把宿主机配置好的redis.conf放到容器内的这个位置中
-v /home/redis/data:/data：把redis持久化的数据在宿主机内显示，做数据备份
redis-server /etc/redis/redis.conf：这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动
–appendonly yes：redis启动后数据持久化
```

# 七、查看是否启动成功

是否成功启动：如果有redis就代表成功了

```shell
docker ps
```

查看日志：

```shell
docker logs redis
```

