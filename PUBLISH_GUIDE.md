# 📦 NPM发布和使用指南

## 🚀 发布到NPM

### 1. 准备工作

```bash
# 1. 注册npm账号 (如果没有)
npm adduser

# 2. 登录npm账号
npm login

# 3. 检查登录状态
npm whoami
```

### 2. 发布前检查

```bash
# 1. 编译TypeScript
npm run build

# 2. 检查编译结果
ls dist/

# 3. 本地测试CLI
node dist/cli.js test-project

# 4. 检查package.json配置
npm pack --dry-run
```

### 3. 发布到NPM

```bash
# 1. 发布 (首次发布)
npm publish

# 2. 如果包名被占用，修改package.json中的name
# 例如: "create-mvw-template-yourname"

# 3. 发布成功后可以在npm官网查看
# https://www.npmjs.com/package/create-mvw-template
```

### 4. 版本更新

```bash
# 更新补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 更新小版本 (1.0.0 -> 1.1.0)
npm version minor

# 更新大版本 (1.0.0 -> 2.0.0)
npm version major

# 发布新版本
npm publish
```

## 🌍 全局安装和使用

### 1. 全局安装

```bash
# 从npm安装
npm install -g create-mvw-template

# 或使用yarn
yarn global add create-mvw-template

# 或使用pnpm
pnpm add -g create-mvw-template
```

### 2. 验证安装

```bash
# 检查版本
create-mvw-template --version

# 查看帮助
create-mvw-template --help
```

### 3. 使用CLI生成项目

```bash
# 交互式创建项目
create-mvw-template

# 指定项目名称
create-mvw-template my-awesome-app

# 跳过交互，使用默认配置
create-mvw-template my-app --skip-prompts

# 使用npx (无需安装)
npx create-mvw-template my-project
```

### 4. 生成项目后的步骤

```bash
# 进入项目目录
cd my-awesome-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🔧 开发和测试

### 本地开发测试

```bash
# 1. 编译项目
npm run build

# 2. 本地链接 (模拟全局安装)
npm link

# 3. 测试CLI
create-mvw-template test-project

# 4. 取消链接
npm unlink -g create-mvw-template
```

### 测试发布包

```bash
# 1. 打包但不发布
npm pack

# 2. 会生成 create-mvw-template-1.0.0.tgz 文件

# 3. 在其他目录测试安装
npm install -g /path/to/create-mvw-template-1.0.0.tgz

# 4. 测试使用
create-mvw-template test-project
```

## 📋 发布检查清单

- [ ] 更新版本号 (`npm version`)
- [ ] 编译TypeScript (`npm run build`)
- [ ] 测试CLI功能 (`node dist/cli.js`)
- [ ] 检查package.json配置
- [ ] 确认files字段包含必要文件
- [ ] 更新README.md
- [ ] 更新CHANGELOG
- [ ] 登录npm账号 (`npm login`)
- [ ] 发布 (`npm publish`)
- [ ] 验证发布成功
- [ ] 测试全局安装

## 🎯 使用示例

### 基础使用

```bash
# 创建Vue 3项目
create-mvw-template my-project

# 选择配置:
# ✅ Project name: my-project
# ✅ CSS preprocessor: SCSS
# ✅ Pinia: Yes
# ✅ Vue Router: Yes

cd my-project
npm install
npm run dev
```

### 快速创建

```bash
# 使用默认配置快速创建
create-mvw-template quick-app --skip-prompts

cd quick-app
npm install
npm run dev
```

### 使用npx (推荐)

```bash
# 无需全局安装，直接使用最新版本
npx create-mvw-template@latest my-project
```

## 🚨 常见问题

### 1. 包名冲突
如果`create-mvw-template`已被占用，修改package.json:
```json
{
  "name": "@yourusername/create-mvw-template"
}
```

### 2. 权限问题
```bash
# 使用sudo (不推荐)
sudo npm install -g create-mvw-template

# 或配置npm全局目录
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### 3. 版本问题
```bash
# 查看已安装版本
npm list -g create-mvw-template

# 更新到最新版本
npm update -g create-mvw-template
```

## 🎉 发布成功！

发布成功后，用户就可以通过以下方式使用你的CLI工具：

```bash
npm install -g create-mvw-template
create-mvw-template my-awesome-project
```

或者使用npx:
```bash
npx create-mvw-template my-awesome-project
```

这样就完成了一个完整的Vue 3项目脚手架工具的发布和使用流程！