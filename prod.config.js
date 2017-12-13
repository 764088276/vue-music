/**
 * Created by HG on 2017/12/13.
 */
var express=require("express");
var config=require('./config/index.js');
var axios=require('axios');

var app = express();
var apiRouter=express.Router();
//获取歌词数据
apiRouter.get('/getLyricData',(req,res)=>{
  var url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url,{
    headers:{
      referer:'https://c.y.qq.com',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    var  ret=response.data;
    if(typeof ret ==='string'){
      var reg = /^\w+\(({[^()]+})\)$/;
      var match=ret.match(reg);
      if(match){
        ret=JSON.parse(match[1])
      }
    }
    res.json(ret);
  }).catch((e)=>{
    console.log(e)
  })
});
//获取歌单歌曲列表
apiRouter.get('/getDissList',(req,res)=>{
  var url='https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  axios.get(url,{
    headers:{
      referer:'https://y.qq.com/n/yqq/playlist',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
});

app.use('/api',apiRouter);
//配置静态资源路径
app.use(express.static('./dist'));

var port=process.env.PORT||config.build.port;
module.exports=app.listen(port,function(err){
  if(err){
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:'+port+'\n')
})

