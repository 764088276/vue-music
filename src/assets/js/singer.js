/**
 * Created by HG on 2017/9/27.
 */
export default class singer{
  constructor(item){
    this.name=item.Fsinger_name;
    this.id=item.Fsinger_id;
    this.mid=item.Fsinger_mid;
    this.avatar=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`

  }
}
