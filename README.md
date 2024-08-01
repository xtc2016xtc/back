# 社交后台系统

## 项目简介

社交后台系统是一个基于React和tyscript的前后端分离项目，用于管理社交平台上的用户、帖子、评论等数据。该项目包括用户管理、帖子管理、评论管理等功能，旨在为社交平台提供高效、稳定的数据管理服务。

## 技术栈

- 后端: Appwrite
- 前端：react + typescript + vite

## 项目结构

- public：静态资源文件
- src：前端代码
  - _auth:登录验证
    - forms:登录组件表单
      - SignInForm:登录表单
      - SignUpForm:注册表单
    - AuthLayout:登录注册组件布局
    - AuthProvider:登录组件提供者:-[熊](https://gitee.com/xiong-goucheng)
  - _root:主体
    - pages:页面
      - Home:首页
      - index.ts:默认导出
    - RootLayout:根组件布局
    - RootProvider:根组件提供者:-[熊](https://gitee.com/xiong-goucheng)
  - components:组件
    - shared:全局共享
      - Loader:加载组件
    - ui:shadcn-ui第三方库[组件库]
      - button:按钮组件
      - input:输入框组件
      - form: 表单组件
      - label: 标签组件
  - lib:工具函数
    - appwrite:appwrite工具函数
      - api：appwrite接口函数
      - config：appwrite配置
    - validate:表单验证工具函数
      - utils:工具函数
  - types:类型定义
  - utils:静态资源导入

## 安装与运行

1. 克隆项目到本地
2. 进入项目目录，安装依赖

   ```bash
   npm install
   ```

3. 启动项目

   ```bash
   npm run dev
   ```

4. 访问 <http://localhost:5173> 即可查看项目运行效果

5. 生产环境:<http://localhost:4173/>

## 功能模块

- 用户管理：包括用户注册、登录、信息修改等功能。+
- 帖子管理：包括发帖、编辑、删除帖子等功能。
- 评论管理：包括评论、回复评论、删除评论等功能。

## 贡献者

- [熊](https://gitee.com/xiong-goucheng)

## 许可证

本项目采用 MIT 许可证。
