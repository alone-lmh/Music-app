import { get } from "../utils/request";

//获取banner图
export function getBannerImgs() {
  return get("/banner?type=1");
}

//获取新歌推荐
export function getNewMusic() {
  return get("/personalized/newsong");
}

//获取排行榜
export function getRankingList() {
  return get("/toplist");
}

//获取排行榜详情
export function getRankingDetails() {
  return get("/toplist/detail");
}

//获取排行榜歌曲列表
export function getRankingSongsList(id) {
  return get("/top/list?idx=" + id);
}

//获取歌手分类下歌手列表
export function getSinger(id) {
  return get("/artist/list?cat=" + id);
}

//获取歌手详情
export function getSingerMusic(id) {
  return get("/artists?id=" + id);
}

//获取歌单列表
export function getSongList() {
  return get("/top/playlist/catlist");
}

//获取歌单详情
export function getSongListDetails(id) {
  return get("/playlist/detail?id=" + id);
}

//获取歌曲详情
export function getSongsDetail(id) {
  return get("/song/detail?ids=" + id);
}

//获取歌词
export function getSongWords(id) {
  return get("/lyric?id=" + id);
}

//获取歌曲播放路径
export function getMusicSrc(id) {
  return get("/song/url?id=" + id);
}

//获取所有的mv  offset表示偏移量  limit表示每页显示的数量  page表示第几页
export function getAllMv(obj) {
  return get("/mv/all?offset=" + obj.page * obj.limit + "&limit=" + obj.limit);
}

//获取mv的播放地址
export function getMvUrl(id) {
  return get("/mv/url?id=" + id);
}

//获取视频的播放地址   注意：获取到视频播放地址之后要将地址后面的最后一个&往后的字符串截取掉
export function getVideoUrl(id) {
  return get("/video/url?id=" + id);
}

//热搜关键字
export function getHotSearch() {
  return get("/search/hot");
}

//搜索提示
export function getSearchTip(words) {
  return get("/search/suggest?keywords=" + words + "&type=mobile");
}

//获取根据关键字搜索mv
export function getSearchMvResult(words) {
  return get("/search?limit=100&keywords=" + words +"&type=1004");
}

//获取根据关键字搜索视频
export function getSearchVideoResult(obj) {
  return get("/search?keywords=" + obj.words +"&type=1014&offset=" + obj.page * obj.limit + "&limit=" + obj.limit);
}

//获取根据关键字搜索单曲
export function getSearchSongResult(words) {
  return get("/search?limit=100&keywords=" + words );
}

//登录验证
export function loginCheck(obj) {
  return get("/login/cellphone?phone=" + obj.phone + "&password=" + obj.psw);
}

//获取验证码
export function getCode(phone) {
  return get("/captcha/sent?phone=" + phone);
}

//验证输入的验证码是否正确
export function phoneVerify(obj) {
  return get("/captcha/verify?phone=" + obj.phone + "&captcha=" + obj.code);
}

//注册账号（修改密码也是这个）
export function register(obj) {
  return get( "/register/cellphone?phone=" + obj.$parent.phone + "&password=" + obj.psw + "&captcha=" + obj.$parent.code + "&nickname=" + obj.username );
}
