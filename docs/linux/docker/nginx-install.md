---
title: Docker安装并配置Nginx
date: 2021-11-14 23:10:08
tags: docker
categories: linux
contact: linux/docker
sidebar: auto
---

# 在Docker下载Nginx镜像

```shell
docker pull nginx:latest

拉取完成查看：docker images
```



# 创建挂载目录

先在主机创建工作文件夹，为了挂载配置和静态文件的访问使用

```shell
mkdir -p /home/nginx/{conf,conf.d,html,logs}
```



# 编写`nginx.conf`配置文件，并放在文件夹中

```lua
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/fgo-images; 
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


```

也可以启动nginx容器来复制

```shell
#启动一个容器
 docker run -d --name nginx nginx
# 查看 容器 获取容器ID 或直接使用名字
 docker container ls
# 在当前目录下创建目录：conf 
 mkdir conf
# 拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录（$PWD 当前全路径）
docker cp nginx:/etc/nginx/nginx.conf $PWD/conf
docker cp nginx:/etc/nginx/conf.d $PWD/conf

# 停止容器
 docker container stop nginx
# 删除容器
 docker container rm nginx

# 在当前目录下创建目录：html 放静态文件
 mkdir html
```



# 启动容器

```shell
docker run --privileged=true -d -p 80:80 -p 443:443 --name nginx  -v /home/nginx/html:/usr/share/nginx/html  -v /home/nginx/conf.d:/etc/nginx/conf.d -v /home/nginx/logs:/var/log/nginx  nginx  
```

下面这个命令用不了，挂载`ngxinx.conf`文件失败，找了很多方法都解决不了，只能用上面的命令启动

```shell
docker run --privileged=true -d -p 80:80 -p 443:443 --name nginx -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/html:/usr/share/nginx/html  -v /home/nginx/conf.d:/etc/nginx/conf.d -v /home/nginx/logs:/var/log/nginx  nginx  
```





# 查看启动的容器

```shell
docker ps 
```

访问80端口查看是否成功，如果能出来页面就成功了