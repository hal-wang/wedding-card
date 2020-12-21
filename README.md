# 喜帖

本人结婚时用的网络喜帖

线上地址： <https://wedding.hal.wang>

网页地址为 `/admin` 则进入管理页，可以添加邀请人并生成邀请二维码。

生成的二维码内容是个网址如 <https://wedding.hal.wang/#/?name=汪文豪>

## Web

网页使用 Vue 制作，固定宽高比例，自适应大小

多处使用 `animate.css` 动画

有 4 个页面：

1. 主页
2. 详情页
3. 管理页
4. 相册页

Web 托管于 `Cloudbase 静态网站`

## Api

有以下两个接口：

1. 管理员添加邀请
2. 验证人名是否存在

API 托管于 `Cloudbase 云函数`

使用 [cloudbase-access](https://github.com/hal-wang/cloudbase-access) 框架

## 数据库

数据库使用的 `Cloudbase 数据库`

需要两个 `document`：

1. people
2. config

`people` 用于存放邀请的人

`config` 用于存放配置，现在只配置了个管理员密码

### 配置数据库

如果你要尝试使用，需要做以下步骤：

1. 创建以上两个 `document`
2. 在 `config` 中添加一个 `collection` ，内容如下：

```JSON
{
  "_id":"admin",
  "key":"your_admin_key"
}
```
