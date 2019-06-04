# 待开发内容

## 当前

- [x] 点赞需要一个检查是否点赞过，再次点击取消的功能
- [x] 文章编辑（本人显示按钮）
- [x] 文章删除（本人显示按钮）
- [x] 文集功能（后台文集列表）
用户表下创建文集数组Lists
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





Users下新增


## 功能

- [x] 浏览量
- [x] 点赞、关注
- [x] 评论

## 页面

- [ ] 首页
- [ ] 固定专题合集（最新文章、评论最多文章）
- [ ] 个人信息修改
- [ ] 个人页面
