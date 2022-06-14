---
title: Linux 使用 Vsftpd 搭建 FTP 服务
date: 2022-01-27 17:03:05
tags: ftp
categories: linux
sidebar: auto
---

本文以 centos 的Linux服务器为例，使用 Vsftpd 搭建被动模式的 FTP 服务。

## FTP 的两种模式

FTP 存在两种模式，PORT(主动)模式和PASV(被动)模式。

### 主动模式

**FTP服务器“主动”去连接客户端的数据端口来传输数据。** 即客户端从一个任意的非特权端口N（N>1024）连接到FTP服务器的21端口。然后客户端开始监听N+1，并发送 PORT N+1 到FTP服务器。接着服务器会从它自己的数据端口（20）连接到客户端指定的数据端口（N+1）。

### 被动模式

**FTP服务器“被动”等待客户端来连接自己的数据端口。** 即当开启一个FTP连接时，客户端打开两个任意的非特权本地端口（N >1024和N+1）。第一个端口连接服务器的21端口，但与主动方式的FTP不同，客户端不会提交 PORT 命令并允许服务器来回连它的数据端口，而是提交 PASV 命令。这样做的结果是服务器会开启一个任意的非特权端口（P > 1024），并发送 PORT P 命令给客户端。然后客户端发起从本地端口N+1到服务器的端口P的连接用来传送数据。(此模式下的FTP服务器不需要开启tcp 20端口)

### 两种模式比较

（1）PORT（主动）模式只要开启服务器的21和20端口，而PASV（被动）模式需要开启服务器大于1024所有tcp端口和21端口。

（2）从网络安全的角度来看的话似乎 PORT 模式更安全，而 PASV 更不安全，那么为什么 RFC 要在 PORT 基础再制定一个 PASV 模式呢？其实 RFC 制定 PASV 模式的主要目的是为了数据传输安全角度出发的，因为 PORT 使用固定20端口进行传输数据，那么作为黑客很容使用sniffer等探嗅器抓取 ftp 数据，这样一来通过 PORT 模式传输数据很容易被黑客窃取，因此使用 PASV 方式来架设 ftp server 是最安全绝佳方案。



## 安装 Vsftpd

1、安装

```shell
yum install vsftpd
```

2、设置开机启动

```shell
systemctl enable vsftpd
```

3、启动 vsftpd

```shell
systemctl start vsftpd
```

4、确认已经启动 vsftpd

```shell
systemctl status vsftpd
```



## 配置 Vsftpd

1、为 FTP 服务创建一个用户,并设置不能通过ssh登录

```shell
useradd ftpuser
usermod -s /sbin/nologin ftpuser
```

或者

```shell
useradd -s /sbin/nologin ftpuser
```

出现登录失败的情况,首先检查账号密码等设置，如果都正确那么

```shell
# 1.如果一直出现ftp登陆时报错，530 Login incorrect.Login failed.
# 2.请先看看百度前三种问题是否能解决，我这是第四种，因为我没有在百度上找到我着一种。
# 3.cat /etc/passwd，查看你登陆的账户主目录和登陆shell对应的是什么，我的是/sbin/nologin
# 用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
# 4.查看cat /etc/shells是否有你用户的主目录和登陆shell,没有进行添加，保存，退出。
vim /etc/shells
# 5、添加/sbin/nologin,保存退出
cat /etc/shells
# 结果如下
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
/bin/tcsh
/bin/csh
/bin/ksh
/bin/rksh
/sbin/nologin

#6、最简单的方式直接执行下面的命令即可
echo -e "\n/sbin/nologin" >> /etc/shells
```

2、设置该用户的密码

```shell
passwd ftpuser
```

3、创建 FTP 服务使用的文件目录，并修改目录权限

```shell
mkdir /var/ftp/ftpupload
chown -R ftpuser:ftpuser /var/ftp/ftpupload
```

4、编辑配置文件 `/etc/vsftpd/vsftpd.conf`

- 修改 配置文件之前先备份

```shell
cp /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.back
```

- 修改以下配置参数,监听 IPv4 或 IPv6 只能选择开启一个

```shell
# 匿名用户的登录权限
anonymous_enable=NO

# 本地用户的登录权限
local_enable=YES

# 将所有用户限制在主目录
chroot_local_user=YES

# 启动限制用户的名单
chroot_list_enable=YES

# 例外用户列表文件的路径
chroot_list_file=/etc/vsftpd/chroot_list

# 开启监听 IPv4 sockets
listen=YES

# 关闭监听 IPv6
#listen_ipv6=YES
```

- 新增以下配置参数，开启被动模式

```shell
# 本地用户登录后所在目录
local_root=/var/ftp/upload

# 本地用户访问相关，需要开启
allow_writeable_chroot=YES

# 开启被动模式
pasv_enable=YES

# 被动模式地址，本服务器的 IP 地址
pasv_address=xxx.xx.xxx.xx

# 被动模式使用的最小、最大端口
pasv_min_port=40000
pasv_max_port=45000
```



- 创建并编辑配置中 `chroot_list_file` 指定的例外用户列表文件

```shell
touch /etc/vsftpd/chroot_list
```

- 重启 FTP 服务

```shell
systemctl restart vsftpd
```



## 防火墙配置

禁用防火墙或者开启21端口和30000端口

1、禁用防火墙（不推荐）

```shell
systemctl stop firewalld
```

2、开启21端口和40000-45000端口

```shell
#开启21端口
firewall-cmd --zone=public --add-port=21/tcp --permanent
#开启30000端口
firewall-cmd --zone=public --add-port=40000-45000/tcp --permanent
#刷新配置
firewall-cmd --reload
```



## 文件目录说明

**默认的安装位置在`/etc/vsftpd/`**

- ftpusers 			-- 不能访问FTP用户列表
  - 手动配置某某用户不能访问       --- 属于单独的限制性黑名单
- user_list        --   不能访问FTP用户列表
  - 这个要在`vsftpd.conf`搭配`userlist_deny=NO`或`userlist_deny=YES`
  - `userlist_deny=NO`和`user_list`中配置用户  可以访问
  - `userlist_deny=YES`和`user_list`中配置用户  不能访问
- vsftpd.conf     --- 主配置文件

**小结：如果要配置的话在`ftpusers`配置比较方便点**



## vsftpd.conf 配置说明

| 属性                    | 属性值     | 含义                                                         |
| ----------------------- | ---------- | ------------------------------------------------------------ |
| anonymous_enable        | YES/NO     | 是否允许匿名用户（anonymous）登录 FTP，如果该设置被注释，则默认允许 |
| local_enable            | YES/NO     | 是否允许本地系统用户登录                                     |
| write_enable            | YES/NO     | 是否开启任何形式的 FTP 写入命令，上传文件                    |
| local_umask             | xxx        | 本地用户的 umask 设置，如果注释该设置则默认为 077，但一般都设置成 022 |
| anon_upload_enable      | YES/NO     | 是否允许匿名用户上传文件，如果要设置为允许，则需要先开启 write_enable，否则无效，此外对应目录还要具有写权限 |
| anon_mkdir_write_enable | YES/NO     | 是否允许匿名用户创建新目录                                   |
| dirmessage_enable       | YES/NO     | 当进入某个目录时，发送信息提示给远程用户                     |
| xferlog_enable          | YES/NO     | 是否开启 上传/下载 的日志记录                                |
| connect_from_port_20    | YES/NO     | 是否使用 20 端口来连接 FTP                                   |
| chown_uploads           | YES/NO     | 匿名上传的文件是否由某一指定用户 chown_username 所有         |
| chown_username          | 有效用户名 | 匿名上传的文件由该设定用户所有                               |
| xferlog_file            | 有效路径   | 设置日志文件的保存位置，默认为 /var/log/xferlog              |
| xferlog_std_format      | YES/NO     | 是否使用标准的 ftpd xferlog日志格式，该格式日志默认保存在 /var/log/xferlog |
| idle_session_timeout    | 数值       | 设置空闲连接的超时时间，单位 秒                              |
| data_connection_timeout | 数值       | 设置等待数据传输的最大时间，单位 秒（data_connection_timeout 与 idle_session_timeout  在同一时间只有一个有效） |
| nopriv_user             | 有效用户名 | 指定一个非特权用户，用于运行 vsftpd                          |
| async_abor_enable       | YES/NO     | 是否支持异步 ABOR 请求                                       |
| ascii_upload_enable     | YES/NO     | 是否开启 ASCII 模式进行文件上传，一般不开启                  |
| ascii_download_enable   | YES/NO     | 是否开启 ASCII 模式进行文件下载，一般不开启                  |
| ftpd_banner             | …          | 自定义登录标语                                               |
| deny_email_enable       | YES/NO     | 如果匿名登录，则会要求输入 email 地址，如果不希望一些 email 地址具有登录权限，则可以开启此项，并在  banned_email_file 指定的文件中写入对应的 email 地址 |
| banned_email_file       | 有效文件   | 当开启 deny_email_enable 时，需要通过此项指定一个保存登录无效 email 的文件 |
| chroot_local_user       | YES/NO     | 是否将所有用户限制在主目录，当为 NO 时， FTP 用户可以切换到其他目录 |
| chroot_list_enable      | YES/NO     | 是否启用限制用户的名单列表                                   |
| chroot_list_file        | 有效文件   | 用户列表，其作用与 chroot_local_user 和 chroot_local_user 的组合有关，详见下表 |
| allow_writeable_chroot  | YES/NO     | 是否允许用户对 ftp 根目录具有写权限，如果设置成不允许而目录实际上却具备写权限，则会报错 |
| ls_recurse_enable       | YES/NO     | 是否允许 ls -R 指令来递归查询，递归查询比较耗资源            |
| listen                  | YES/NO     | 如果为 YES，vsftpd 将以独立模式运行并监听 IPv4 的套接字，处理相关连接请求（该指令不能与 listen_ipv6 一起使用） |
| listen_ipv6             | YES/NO     | 是否允许监听 IPv6 套接字                                     |
| pam_service_name        | …          | 设置 PAM 外挂模块提供的认证服务所使用的配置文件名 ，即 /etc/pam.d/vsftpd 文件，此文件中  file=/etc/vsftpd/ftpusers 字段，说明了 PAM 模块能抵挡的帐号内容来自文件 /etc/vsftpd/ftpusers 中 |
| userlist_enable         | YES/NO     | 是否启用 user_list 文件来控制用户登录                        |
| userlist_deny           | YES/NO     | 是否拒绝 user_list 中的用户登录，此属性设置需在 userlist_enable = YES 时才有效 |
| tcp_wrappers            | YES/NO     | 是否使用 tcp_wrappers 作为主机访问控制方式                   |
| max_clients             | 数值       | 同一时间允许的最大连接数                                     |
| max_per_ip              | 数值       | 同一个IP客户端连接的最大值                                   |
| local_root              | 有效目录   | 系统用户登录后的根目录                                       |
| anon_root               | 有效目录   | 匿名用户登录后的根目录                                       |
| user_config_dir         | 有效目录   | 用户单独配置文件存放目录，该目录下用户的文件名就是对应用户名 |

`chroot_local_user` 和 `chroot_local_user` 组合功能如下：

|                        | chroot_local_user=YES                                        | chroot_local_user=NO                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| chroot_list_enable=YES | 1.所有用户都被限制在其主目录下     2.使用 `chroot_list_file` 指定的用户列表 `/etc/vsftpd/chroot_list`，这些用户作为“例外”，不受限制 | 1.所有用户都不被限制其主目录下     2.使用 `chroot_list_file` 指定的用户列表 `/etc/vsftpd/chroot_list`，这些用户作为“例外”，受到限制 |
| chroot_list_enable=NO  | 1.所有用户都被限制在其主目录下     2.不使用 `chroot_list_file` 指定的用户列表 `/etc/vsftpd/chroot_list`，没有任何“例外”用户 | 1.所有用户都不被限制其主目录下     2.不使用 `chroot_list_file` 指定的用户列表 `/etc/vsftpd/chroot_list`，没有任何“例外”用户 |

配置文件说明来自： [juejin.cn/post/693341…



## 常用命令

```shell
# 查看状态
systemctl status vsftpd
# 开启
systemctl start vsftpd
# 关闭
systemctl stop vsftpd
# 重启
systemctl restart vsftpd 
-- 下面这种也可以
# 查看状态
/bin/systemctl status  vsftpd.service
# 开启
/bin/systemctl start  vsftpd.service
# 关闭
/bin/systemctl stop  vsftpd.service
# 重启
/bin/systemctl restart  vsftpd.service
```