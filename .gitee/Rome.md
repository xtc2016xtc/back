# 错误信息

```bash

  跳转帖子详情，返回报错Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.chunk-6BKLQ22S.js?v=a9042c2c:14032 The above error occurred in the <PostDetails> component:
组件信息
const PostDetails = () => {
  return (
    <div>PostDetails</div>
  )
}

export default PostDetails
```

## 解决方案

```bash

  1. 确保在调用 removeChild 方法之前，要移除的节点确实是该节点的子节点。
  2. 确保在调用 removeChild 方法时，传入的节点参数是正确的。
  3. 确保在调用 removeChild 方法时，该节点没有被其他代码同时操作。
  4. 确保在调用 removeChild 方法时，该节点没有被其他代码同时操作。
  5. 确保在调用 removeChild 方法时，该节点没有被其他代码同时操作。

  根据你提供的错误信息和组件信息，我们可以推测你可能在某个生命周期方法或事件处理函数中直接操作了 DOM，导致 `removeChild` 方法失败。为了修复这个问题，我们可以使用 React 的状态和属性来控制组件的渲染，而不是直接操作 DOM。

以下是一个完整的解决方案，包括如何获取 URL 参数并在 `PostDetails` 组件中使用它：

1. **安装 React Router**：如果你还没有安装 React Router，请先安装它。

   ```bash
   npm install react-router-dom
   ```

2. **配置路由**：在你的应用中配置路由，以便能够接收 URL 参数。

   ```jsx
   // App.js
   import React from 'react';
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
   import PostDetails from './PostDetails';

   const App = () => {
     return (
       <Router>
         <Switch>
           <Route path="/post/:post" component={PostDetails} />
           {/* 其他路由 */}
         </Switch>
       </Router>
     );
   }

   export default App;
   ```

3. **获取 URL 参数**：在 `PostDetails` 组件中使用 `useParams` 钩子来获取 URL 参数。

   ```jsx
   // PostDetails.js
   import React from 'react';
   import { useParams } from 'react-router-dom';

   const PostDetails = () => {
     const { post } = useParams();

     return (
       <div>
         <h1>Post Details</h1>
         <p>Post ID: {post}</p>
       </div>
     );
   }

   export default PostDetails;
   ```

4. **避免直接操作 DOM**：确保组件不直接操作 DOM，而是通过状态和属性来控制组件的渲染。

这样，就可以在 `PostDetails` 组件中获取到 URL 参数 `post` 的值，并且不会遇到 `removeChild` 错误。

```