# 喜帖

本人结婚时用的网络喜帖，现在用来纪念和记录

线上地址： <https://wedding.hal.wang>

网页地址为 `/admin` 则进入管理页，可以添加邀请人并生成邀请二维码。

生成的二维码内容是个网址如 <https://wedding.hal.wang/#/?name=%E6%B1%AA%E6%96%87%E8%B1%AA>

> 首页 `已相守 ... 天` 是动态的，如果当前日期在结婚之前，会显示为婚礼倒计时

## 改为自己用，你需要做：

1. 一键部署 [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fhal-wang%2Fwedding-card&branch=main)

2. 添加环境变量
   - ADMIN:管理员密码
   - GROOM:新郎姓名
   - BRIDE:新娘姓名
   - DATE:结婚时间，格式 yyyy-MM-dd HH:mm:ss
   - ADDR:详细地址
   - PHONE:电话
   - COVER:封面文件名，对应文件上传至云存储根目录
   - ALBUM:相册文件名，可多个，使用逗号分隔，如 1.jpg,2.png,...。对应文件上传至云存储 album 目录中
   - MUSIC:背景音乐文件名，对应文件上传至云存储根目录
   - FAVICON:网页图标文件名，对应文件上传至云存储根目录
   - MHID:草料二维码 ID，用于生成喜帖二维码

## 二次开发

### API

在 `wedding-card-api` 下创建文件 `.env.local`，内容如下

```
SCF_NAMESPACE=cloudbase环境id
SECRET_KEY=腾讯云 secret key
SECRET_ID=腾讯云 secret id
ADMIN=管理员密码
COVER=封面文件名，对应文件上传至云存储根目录
ALBUM=相册文件名，可多个，使用逗号分隔，如 1.jpg,2.png,...。对应文件上传至云 album 目录中
MUSIC=背景音乐文件名，对应文件上传至云存储根目录
FAVICON=网页图标文件名，对应文件上传至云存储根目录
```

#### 运行 API

先安装依赖，在 `wedding-card-api` 下执行

```bash
yarn install
```

再使用 vscode 打开 `wedding-card-api`，直接 F5 开始调试

或在 `wedding-card-api` 目录下执行

```bash
yarn dev
```

### Web

先安装依赖，在 `wedding-card-web` 下执行

```bash
yarn install
```

再执行下面命令运行

```bash
yarn dev:test
```

或使用已发布的接口，需要修改 `wedding-card-web/.env.development` 文件中的 `VITE_GLOB_PROXY_API_URL`

```bash
yarn dev
```

### 发布

可以本地使用 `@cloudbase/cli` 发布，也可以使用 GitHub Actions 持续集成

#### cli 发布

在项目根目录下创建 `.env.local` （注意是项目根目录，不是 API 或 Web 下）

内容如下

```
ENV_ID=cloudbase环境id
API_NAME=v3 # 不要修改
ADMIN=管理员密码
GROOM=新郎姓名
BRIDE=新娘姓名
DATE=结婚时间，格式 yyyy-MM-dd HH:mm:ss
ADDR=详细地址
PHONE=电话
COVER=封面文件名，对应文件上传至云存储根目录
ALBUM=相册文件名，可多个，使用逗号分隔，如 1.jpg,2.png,...。对应文件上传至云 album 目录中
MUSIC=背景音乐文件名，对应文件上传至云存储根目录
FAVICON=网页图标文件名，对应文件上传至云存储根目录
MHID=草料二维码 ID，用于生成喜帖二维码
```

在项目根目录下运行以下命令发布

```bash
npm run deploy
```

#### GitHub Actions

仓库增加 Secrets，在 `Settings -> Secrets -> Actions`，点击 `New repository secret` 按钮

- TENCENT_SECRET_ID: 腾讯云 secret id
- TENCENT_SECRET_KEY: 腾讯云 secret key
- ENV: 与 `cli 发布` 的 `.env.local` 文件内容相同

配置完成后，每次 main 分支提交代码就会自动发布到 CloudBase

发布进度可在仓库 `Actions` 中看到
