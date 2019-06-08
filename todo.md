# 待开发内容

## 当前

- [x] 用户信息修改
- [x] 用户头像上传修改
  <!-- - [] 用户找回密码（注册时用短信验证） -->

put /api/user 修改用户名和密码
{
userid,newusername,newpassword
}

post /api/user/image 上传或更新头像
{
userid,img
}

## 已完成

- [x] 点赞需要一个检查是否点赞过，再次点击取消的功能
- [x] 文章编辑（本人显示按钮）
- [x] 文章删除（本人显示按钮）
- [x] 删除时收录文集相应删除
- [x] 文集功能（后台文集列表）
      用户表下创建文集数组 Lists

```
Lists:[
   { _id,
    name:string,
    ArticlesId:[]
    }
]
```

Restful api:

post api/lists 创建文集

post api/lists/article 添加单文章到文集

get api/lists/:id 获取某个文集的名称和文章列表

delete api/lists/:id/article/:aid

Users 下新增

## 功能

- [x] 浏览量
- [x] 点赞、关注
- [x] 评论

## 页面

- [ ] 首页
- [ ] 固定专题合集（最新文章、评论最多文章）
- [ ] 个人信息修改
- [ ] 个人页面
