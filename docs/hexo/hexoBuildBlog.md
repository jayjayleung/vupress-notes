---
title: hexo搭建博客
date: 2021-11-11 18:22:00
tags: hexo
categories: hexo
---

## **前言：**

平时利用业余时间学习的东西保存在本地，换个地方就看不到，维护比较麻烦。又不想为了个博客买个服务器，是否也想要搭建一个属于自己的个人网站，如果你曾经或者现在正有这样的想法，请跟随这篇文章发挥你的Geek精神，让你快速拥有自己的博客网站，写文章记录生活，享受这种从0到1的过程。



## **什么是Hexo ?**

![image-20211111182722009](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/image-20211111182722009.png)

Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub和Heroku上，是搭建博客的首选框架。这里我们选用的是GitHub，你没看错，全球最大的同性恋交友网站（逃……）。Hexo同时也是GitHub上的开源项目，参见：[hexojs/hexo](https://github.com/hexojs/hexo) 如果想要更加全面的了解Hexo，可以到其官网 [Hexo](https://hexo.io/) 了解更多的细节，因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。这里，默认各位猿/媛儿都知道GitHub就不再赘述。

**这是我的个人博客效果:** [JayJay](http://blog.lsylsj.cn)

下面正式从零开始搭建年轻人的第一个网站。



## **搭建步骤**

- 获得个人网站域名

- GitHub创建个人仓库

- 安装Git

- 安装Node.js

- 安装Hexo

- 推送网站

- 绑定域名

- 更换主题

- 初识MarkDown语法

- 发布文章

- 寻找图床

- 个性化设置

  

## **获得个人网站域名**

域名是网站的入口，也是网站的第一印象，比如饿了么的官网的域名是：https://www.ele.me/ ，很是巧妙。常见的有com,cn,net,org等后缀，也有小众的xyz,me,io等后缀，根据你自己的喜好，选择不同的后缀，比如我选择就是常见的com后缀。很多小众奇特的后缀在大陆是没办法备案的，网站也就无法上线。然而使用GitHub托管我们的网站，完全不需要备案，因为托管我们的网站内容的服务器在美国，而且在国内备案流程也比较繁杂，时间需要一周左右。

申请域名的地方有很多，这里推荐阿里云：[阿里云-为了无法计算的价值](https://www.aliyun.com/) 申请入口：[域名注册](https://wanwang.aliyun.com/domain/) 购买域名这也是我们整个搭建过程中惟一一个需要花钱的地方。如果你已经有了空闲域名就无需购买，直接使用即可。







## **GitHub创建个人仓库**

登录到GitHub,如果没有GitHub帐号，使用你的邮箱注册GitHub帐号：[Build software better, together](https://github.com/) 点击GitHub中的New repository创建新仓库，仓库名应该为：**用户名**.[http://github.io](http://github.io/) 这个**用户名**使用你的GitHub帐号名称代替，这是固定写法，比如我的仓库名为：

![image-20211111183134408](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/image-20211111183134408.png)



## **安装Git**

什么是Git ?简单来说Git是开源的分布式版本控制系统，用于敏捷高效地处理项目。我们网站在本地搭建好了，需要使用Git同步到GitHub上。如果想要了解Git的细节，参看[廖雪峰](http://weibo.com/liaoxuefeng)老师的Git教程：[Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000) 从Git官网下载：[Git - Downloading Package](https://git-scm.com/download/win) 现在的机子基本都是64位的，选择64位的安装包，下载后安装，在命令行里输入git测试是否安装成功，若安装失败，参看其他详细的Git安装教程。安装成功后，将你的Git与GitHub帐号绑定，鼠标右击打开Git Bash

![image-20211111183344135](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111183344.png)

或者在菜单里搜索Git Bash，设置user.name和user.email配置信息：

```shell
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
```

生成ssh密钥文件：

```shell
ssh-keygen -t rsa -C "你的GitHub注册邮箱"
```

然后直接三个回车即可，默认不需要设置密码
然后找到生成的.ssh的文件夹中的id_rsa.pub密钥，windows一般在C盘Users下面的.ssh文件夹里,将内容全部复制

![image-20211111183539947](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111183540.png)

打开[GitHub_Settings_keys](https://github.com/settings/keys) 页面，新建new SSH Key

![image-20211111183655143](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111183655.png)

Title为标题，任意填即可，将刚刚复制的id_rsa.pub内容粘贴进去，最后点击Add SSH key。
在Git Bash中检测GitHub公钥设置是否成功，输入 ssh git@github.com ：

![image-20211111183741638](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111183741.png)

如上则说明成功。这里之所以设置GitHub密钥原因是，通过非对称加密的公钥与私钥来完成加密，公钥放置在GitHub上，私钥放置在自己的电脑里。GitHub要求每次推送代码都是合法用户，所以每次推送都需要输入账号密码验证推送用户是否是合法用户，为了省去每次输入密码的步骤，采用了ssh，当你推送的时候，git就会匹配你的私钥跟GitHub上面的公钥是否是配对的，若是匹配就认为你是合法用户，则允许推送。这样可以保证每次的推送都是正确合法的。



## **安装Node.js**

Hexo基于Node.js，Node.js下载地址：[Download | Node.js](https://nodejs.org/en/download/) 下载安装包，注意安装Node.js会包含环境变量及npm的安装，安装后，检测Node.js是否安装成功，在命令行中输入 node -v :

![image-20211111184127843](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184128.png)

检测npm是否安装成功，在命令行中输入npm -v :

![image-20211111184208559](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184208.png)

到这了，安装Hexo的环境已经全部搭建完成。



## **安装Hexo**

Hexo就是我们的个人博客网站的框架， 这里需要自己在电脑常里创建一个文件夹，可以命名为Blog，Hexo框架与以后你自己发布的网页都在这个文件夹中。创建好后，进入文件夹中，按住shift键，右击鼠标点击命令行

![image-20211111184249858](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184250.png)

使用npm命令安装Hexo，输入：

```shell
npm install -g hexo-cli 
```

这个安装时间较长耐心等待，安装完成后，初始化我们的博客，输入：

```shell
hexo init blog
```

注意，这里的命令都是作用在刚刚创建的Blog文件夹中。

为了检测我们的网站雏形，分别按顺序输入以下三条命令：

```shell
hexo new test_my_site

hexo g

hexo s
```

这些命令在后面作介绍，完成后，打开浏览器输入地址：

localhost:4000

可以看出我们写出第一篇博客，只不过我下图是我修改过的配置，和你的显示不一样。

![image-20211111184422008](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184422.png)

现在来介绍常用的Hexo 命令

npm install hexo -g #安装Hexo
npm update hexo -g #升级
hexo init #初始化博客

命令简写
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo g == hexo generate #生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy #部署

hexo server #Hexo会监视文件变动并自动更新，无须重启服务器
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存，若是网页正常情况下可以忽略这条命令

刚刚的三个命令依次是新建一篇博客文章、生成网页、在本地预览的操作。



## **推送网站**

上面只是在本地预览，接下来要做的就是就是推送网站，也就是发布网站，让我们的网站可以被更多的人访问。在设置之前，需要解释一个概念，在blog根目录里的_config.yml文件称为**站点**配置文件，如下图

![image-20211111184550978](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184551.png)

进入根目录里的themes文件夹，里面也有个_config.yml文件，这个称为**主题**配置文件，如下图

![image-20211111184634970](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184635.png)

下一步将我们的Hexo与GitHub关联起来，打开站点的配置文件_config.yml，翻到最后修改为：

```yml
deploy:
type: git
repo: 这里填入你之前在GitHub上创建仓库的完整路径，记得加上 .git
branch: main参考如下：
```



![image-20211111184831543](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184831.png)

保存站点配置文件。

其实就是给hexo d 这个命令做相应的配置，让hexo知道你要把blog部署在哪个位置，很显然，我们部署在我们GitHub的仓库里。最后安装Git部署插件，输入命令：

```shell
npm install hexo-deployer-git --save
```

这时，我们分别输入三条命令：

```shell
hexo clean 
hexo g 
hexo d
```

其实第三条的 hexo d 就是部署网站命令，d是deploy的缩写。完成后，打开浏览器，在地址栏输入你的放置个人网站的仓库路径，即 [http://xxxx.github.io](http://xxxx.github.io/) (知乎排版可能会出现"http://"字样，参考下图) 比如我的xxxx就是我的GitHub用户名：

![image-20211111184955064](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111184955.png)

你就会发现你的博客已经上线了，可以在网络上被访问了。



## **绑定域名**

虽然在Internet上可以访问我们的网站，但是网址是GitHub提供的:[http://xxxx.github.io](http://xxxx.github.io/) (知乎排版可能会出现"http://"字样) 而我们想使用我们自己的个性化域名，这就需要绑定我们自己的域名。这里演示的是在腾讯云的域名绑定，在国内主流的域名代理厂商也就阿里云和腾讯云。登录到腾讯云，进入管理控制台的域名列表，找到你的个性化域名，进入解析

![image-20211111185117168](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111185117.png)

![image-20211111185208944](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111185209.png)

包括添加三条解析记录，185.199.109.153是GitHub的地址，你也可以ping你的 [http://xxxx.github.io](http://xxxx.github.io/) 的ip地址，填入进去。第三个记录类型是CNAME，CNAME的记录值是：你的用户名.[http://github.io](http://github.io/) 这里千万别弄错了。第二步，登录GitHub，进入之前创建的仓库，点击settings，设置Custom domain，输入你的域名

![image-20211111185334058](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111185334.png)

点击save保存。第三步，进入本地博客文件夹 ，进入blog/source目录下，创建一个记事本文件，输入你的域名，对，只要写进你自己的域名即可。如果带有www，那么以后访问的时候必须带有www完整的域名才可以访问，但如果不带有www，以后访问的时候带不带www都可以访问。所以建议，不要带有www。这里我还是写了www(不建议带有www):

![image-20211111185539053](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111185539.png)

保存，命名为CNAME ，注意保存成**所有文件**而不是**txt文件**。

完成这三步，进入blog目录中，按住shift键右击打开命令行，依次输入：

```shell
hexo clean
hexo g
hexo d
```

这时候打开浏览器在地址栏输入你的个性化域名将会直接进入你自己搭建的网站。



## **更换主题**

如果你不喜欢Hexo默认的主题，可以更换不同的主题，主题传送门：[Themes](https://hexo.io/themes/) 我自己使用的是hexo-theme-matery主题，可以在blog目录中的themes文件夹中查看你自己主题是什么。现在把默认主题更改成hexo-theme-matery主题，在blog目录中（就是命令行的位置处于blog目录）打开命令行输入：

```shell
git clone https://github.com/blinkfox/hexo-theme-matery
```

![image-20211111190332336](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111190332.png)

这个主题有多种配置，详情去主题的git地址查看



**初识Markdown语法**



Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。Markdown语法简洁明了、容易掌握，而且功能比纯文本更强，因此写博客使用它，可以让用户更加专注的写文章，而不需要费尽心力的考虑样式，相对于html已经算是轻量级语言，像有道云笔记也支持Markdown写作。并且Markdown完全兼容html，也就是可以在文章里直接插入html代码。比如给博文添加音乐，就可以直接把音乐的外链html代码插入文章中。具体语法参看：[Markdown 语法说明(简体中文版)](http://www.appinn.com/markdown/) 可以说十分钟就可以入门。当然，工欲善其事必先利其器，选择一个好的Markdown编辑器也是非常重要的，这里推荐[MarkPad](http://code52.org/DownmarkerWPF/) 和[The Markdown Editor for Windows](http://www.markdownpad.com/) ，这是带有预览效果的编辑器，也可以使用本地的文本编辑器，更多的Markdown的语法与编辑器自己可以搜索了解。



## **发布文章**

我们开始正式发布上线博客文章，在命令行中输入：

```shell
hexo n "博客名字"
```

我们会发现在blog根目录下的source文件夹中的_post文件夹中多了一个 **博客名字.md** 文件，使用Markdown编辑器打开，就可以开始你的个人博客之旅了，Markdown常用的样式也就十来种，完全能够满足一般博文的样式要求，示例：

![image-20211111190717328](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111190717.png)

通过带有预览样式的Markdown编辑器实时预览书写的博文样式，也可以通过命令 hexo s --debug 在本地浏览器的localhost:4000 预览博文效果。写好博文并且样式无误后，通过hexo g、hexo d 生成、部署网页。随后可以在浏览器中输入域名浏览。



## **寻找图床**

图床，当博文中有图片时，若是少量图片，可以直接把图片存放在source文件夹中，但这显然不合理的，因为图片会占据大量的存储的空间，加载的时候相对缓慢 ，这时考虑把博文里的图片上传到某一网站，然后获得外部链接，使用Markdown语法，**`![图片信息](外部链接)`** 完成图片的插入，这种网站就被成为图床。常见的简易的图床网站有：[贴图库图片外链](http://www.tietuku.com/) 国内算比较好的图床我认为有两个：新浪微博和 [七牛云](https://www.qiniu.com/) ，七牛云的使用方法可以参看其他文章。图床最重要的就是稳定速度快，所以在挑选图床的时候一定要仔细，下图是博文插入图片，使用图床外链的示例：

![image-20211111190852867](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111190853.png)



## **个性化设置**

所谓的个性化设置就是根据个人需要添加不同的插件及功能。

基本的有：

在站点配置文件_config.yml修改基本的站点信息

![image-20211111190922729](https://cdn.jsdelivr.net/gh/jayjayleung/jayjayImages/mrc/images/20211111190923.png)

依次是网站标题、副标题、网站描述、作者、网站头像外部链接、网站语言、时区等。
