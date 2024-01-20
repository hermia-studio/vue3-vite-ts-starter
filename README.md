# vue3-vite-ts-starter
一套完美集成 Vue 3.x +Vite 5.x + TypeScript + Vue Router + Pinia + Axios + ESLint 等的前端快速开发模板
A Vue 3.x +Vite 5.x + TypeScript + Vue Router + Pinia + Axios + ESLint template starter
- [搭建过程](搭建过程.md)

## 技术栈
- 编程语言：TypeScript 5.x + JavaScript
- 构建工具：Vite 5.x
- 前端框架：Vue 3.x
- 路由工具：Vue Router 4.x
- 状态管理：Pinia 2.x
- 函数工具：VueUse 10.x
- UI 框架：Element Plus
- CSS 预编译：Sass 
- HTTP 工具：Axios
- Git Hook 工具：husky 
- 代码规范：EditorConfig + Prettier + ESLint 
- 提交规范：Commitizen + Commitlint

## 其他
>二次封装axios
- 请求和响应拦截器
  - 可创建多个request请求，使用不同的baseUrl
  - 可添加类拦截器、实例拦截器、接口拦截器
- 将token携带在请求头中
- 封装loading

## 快速开始
### 获取项目
>本地
- 新建空文件夹
- 右击使用Git Bash打开文件夹，git init初始化仓库
- 配置用户名和邮箱
```
git config  user.name "你的名字（一定要是英文的）"
git config  user.email "你的邮箱"
```
- 创建SSH密钥对
```
ssh-keygen -t rsa -C 邮箱名
// 如果不需要设置密码，可以直接按Enter键
```
- 之后就会在用户主目录下的.ssh文件夹中生成以下两个文件：
id_rsa、id_rsa.pub；其中id_rsa为私钥，id_rsa.pub为公钥
- 打开id_rsa.pub，复制内容，将公钥内容粘贴到自己github/Gitee的设置中
- 将自定义路径的私钥添加到ssh秘钥搜索列表中
```
//连接认证agent（身份验证代理）
ssh-agent bash
//修改私钥路径
ssh-add ~/.ssh/id_rsa
```
- 测试本机能否与github/gitee使用ssh通信
```
ssh -T git@github.com
//ssh返回 “……successfully ……”，这表示可以与远程愉快的通信了
```
- 修改本地仓库主分支的命名
```
git branch -m master main
```
- 本地仓库与GitHub远程仓库进行关联
```
git remote add origin git@github.com:hermia-studio/vue3-vite-ts-starter.git
```
- 将远程仓库拉取到本地
```
git pull origin main
```

### 安装依赖

```sh
npm install
```

### 启动项目

```sh
npm run dev
```

### 项目打包

```sh
npm run build
```
### 提交代码
>- 提交后commit-msg的格式为：type:message
- 将文件提交到暂缓区：`git add .`
- 输入`npm run commit`
- 选择type，即本次更新的类型
- 选择本次修改的范围（作用域）
- 输入提交的信息message
- 提交详细的描述信息(比上一步更详细的信息)
- 选择 是否是一次重大的更改
- 选择 是否影响某个open issue(开源项目)


### 使用ESLint

```sh
npm run lint
```
