# 喜帖

本人结婚时用的网络喜帖

线上地址： <https://wedding.hal.wang>

网页地址为 `/admin` 则进入管理页，可以添加邀请人并生成邀请二维码。

生成的二维码内容是个网址如 <https://wedding.hal.wang/#/?name=汪文豪>

## 改用自己用，你需要做：

1. 一键部署 [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fhal-wang%2Fwedding-card&branch=main)

2. 添加环境变量
   - ADMIN: 管理员密码
   - GROOM: 新郎姓名
   - BRIDE: 新娘姓名
   - DATE: 结婚时间，格式 yyyy-MM-dd HH:mm:ss
   - ADDR: 详细地址
   - PHONE: 电话
