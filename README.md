# Music-app
基于Vue的音乐播放器

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 使用到的工具有：
 - Vue
 - Vuex
 - Vue-Router
 - Vue-cli
 - Axios
 - animate

 ### 接口（来源： https://github.com/Binaryify/NeteaseCloudMusicApi ）：

### banner( 轮播图 )接口

- 可选参数 :

- type:资源类型,对应以下类型,默认为 0 即PC

0: pc

1: android

2: iphone

3: ipad
- 接口地址 : /banner

- 调用例子 : /banner, /banner?type=2

 ### 推荐新音乐：

 接口地址 : /personalized/newsong

### 所有榜单：

说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist

调用例子 : /toplist

### 排行榜

说明 : 调用此接口 , 传入数字 idx, 可获取不同排行榜

必选参数 : idx: 对象 key, 对应以下排行榜

```
"0": 云音乐新歌榜,

"1": 云音乐热歌榜,

"2": 网易原创歌曲榜,

"3": 云音乐飙升榜,

"4": 云音乐电音榜,

"5": UK排行榜周榜,

"6": 美国Billboard周榜

"7": KTV嗨榜,

"8": iTunes榜,

"9": Hit FM Top榜,

"10": 日本Oricon周榜

"11": 韩国Melon排行榜周榜,

"12": 韩国Mnet排行榜周榜,

"13": 韩国Melon原声周榜,

"14": 中国TOP排行榜(港台榜),

"15": 中国TOP排行榜(内地榜)

"16": 香港电台中文歌曲龙虎榜,

"17": 华语金曲榜,

"18": 中国嘻哈榜,

"19": 法国 NRJ EuroHot 30周榜,

"20": 台湾Hito排行榜,

"21": Beatport全球电子舞曲榜,

"22": 云音乐ACG音乐榜,

"23": 云音乐说唱榜

"24": 云音乐古典音乐榜

"25": 云音乐电音榜

"26": 抖音排行榜

"27": 新声榜

"28": 云音乐韩语榜

"29": 英国Q杂志中文版周榜

"30": 电竞音乐榜

"31": 云音乐欧美热歌榜

"32": 云音乐欧美新歌榜

"33": 说唱TOP榜
```

- 接口地址 : /top/list

- 调用例子 : /top/list?idx=6

### 所有榜单内容摘要

说明 : 调用此接口,可获取所有榜单内容摘要 接口地址 : /toplist/detail

调用例子 : /toplist/detail

### 推荐歌单

可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)

接口地址 : /personalized

调用例子 : /personalized?limit=1

### 歌手分类列表
说明 : 调用此接口,可获取歌手分类列表

必选参数 : cat : 即 category Code,歌手类型,默认 1001,返回华语男歌手数据

可选参数 :

limit : 返回数量 , 默认为 30

offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?cat=1001&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列

```
category Code 取值:

入驻歌手 5001

华语男歌手 1001

华语女歌手 1002

华语组合/乐队 1003

欧美男歌手 2001

欧美女歌手 2002

欧美组合/乐队 2003

日本男歌手 6001

日本女歌手 6002

日本组合/乐队 6003

韩国男歌手 7001

韩国女歌手 7002

韩国组合/乐队 7003

其他男歌手 4001

其他女歌手 4002

其他组合/乐队 4003
```

接口地址 : /artist/list

调用例子 : /artist/list?cat=1001

### 获取歌手描述

说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述

必选参数 : id: 歌手 id

接口地址 : /artist/desc

调用例子 : /artist/desc?id=6452 ( 周杰伦 )

### 获取歌手单曲

说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲

必选参数 : id: 歌手 id, 可由搜索接口获得

接口地址 : /artists

调用例子 : /artists?id=6452

### 默认搜索关键词

说明 : 调用此接口 , 可获取默认搜索关键词

接口地址 : /search/default

### 热搜列表(简略)

说明 : 调用此接口,可获取热门搜索列表

接口地址 : /search/hot

调用例子 : /search/hot

### 搜索多重匹配

说明 : 调用此接口 , 传入搜索关键词可获得搜索结果

必选参数 : keywords : 关键词

接口地址 : /search/multimatch

调用例子 : /search/multimatch?keywords= 海阔天空

### 获取歌曲详情

说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)

必选参数 : ids: 音乐 id, 如 ids=347230

接口地址 : /song/detail

调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231

### 获取歌词

说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )

必选参数 : id: 音乐 id

接口地址 : /lyric

调用例子 : /lyric?id=33894312

### 手机登录

必选参数 : phone: 手机号码 password: 密码

接口地址 : /login/cellphone

可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1

调用例子 : /login/cellphone?phone=xxx&password=yyy

### 发送验证码

说明 : 调用此接口 ,传入手机号码, 可发送验证码

必选参数 : phone: 手机号码

可选参数 : ctcode: 国家区号,默认86即中国

接口地址 : /captcha/sent

调用例子 : /captcha/sent?phone=13xxx

### 验证验证码

说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确

必选参数 : phone: 手机号码

captcha: 验证码

可选参数 :

ctcode: 国家区号,默认86即中国

接口地址 : /captcha/verify

调用例子 : /captcha/verify?phone=13xxx&captcha=1597

### 注册(修改密码)

说明 : 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)

必选参数 :

captcha: 验证码

phone : 手机号码

password: 密码

nickname: 昵称

接口地址 : /register/cellphone

调用例子 : /register/cellphone?phone=13xxx&password=xxxxx&captcha=1234&nickname=binary1345

### 检测手机号码是否已注册

说明 : 调用此接口 ,可检测手机号码是否已注册 必选参数 : phone : 手机号码

可选参数 : countrycode: 国家码，用于国外手机号，例如美国传入：1 接口地址 : /cellphone/existence/check

调用例子 : /cellphone/existence/check?phone=13xxx

### 初始化昵称

说明 : 刚注册的账号(需登录),调用此接口 ,可初始化昵称 必选参数 : nickname : 昵称

接口地址 : /activate/init/profile

调用例子 : /activate/init/profile?nickname=testUser2019

### 退出登录

说明 : 调用此接口 , 可退出登录

调用例子 : /logout

### 登录状态

说明 : 调用此接口,可获取登录状态

接口地址 : /login/status 
