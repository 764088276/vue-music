<template>
  <div>
    <transition name="slide">
      <music-list :name="disc.title" :bgImage="disc.cover" :songs="songList"></music-list>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import musicList from 'components/musicList/musicList'
  import {getDiskSongList} from 'api/recommend'
  import {mapGetters} from 'vuex'
  import {createSong} from 'assets/js/song'

  export default{
    data(){
      return {
          songList:[]
      }
    },
    created(){
      this._getDiskSongList()
    },
    computed: {
      ...mapGetters([
        'disc'
      ])
    },
    methods: {
      _getDiskSongList(){
        getDiskSongList(this.disc.content_id).then(res => {
          res.data.songlist.forEach((item)=>{
              this.songList.push(createSong(item))
          });
          console.log(this.disc);
        })
      }
    },
    components: {
      musicList
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
