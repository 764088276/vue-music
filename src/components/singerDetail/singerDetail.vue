<template>
  <transition name="slide">
    <music-list :songs="songList" :name="name" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script type="text/javascript">
  import {mapState, mapGetters} from 'vuex'
  import {getSingerDetail, getAlbumDetail} from 'api/singerDetail'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'assets/js/song'
  import musicList from 'components/musicList/musicList'

  export default{
    data(){
      return {
        songs: [],
        songList: [],
        name: '',
        bgImage: ''
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      if (this.singer.albumid) {
        this.getAlbumData();
      } else {
        this.getSingerData();
      }

    },
    mounted(){
      this.name = this.singer.name;
      this.bgImage = this.singer.avatar;
    },
    methods: {
      getSingerData(){
        if (!this.singer.id) {
          this.$router.back();
        }
        getSingerDetail(this.singer).then((res) => {
          if (res.code == ERR_OK) {
            this.songs = res.data.list;
          }
          this.songs.forEach((song) => {
            this.songList.push(createSong(song.musicData));
          });
        })
      },
      getAlbumData(){
        getAlbumDetail(this.singer.albummid).then(res => {
          if (res.code == ERR_OK) {
            console.log(res);
            this.songs = res.data.list;
          }
          this.songs.forEach((song) => {
            this.songList.push(createSong(song))
          })
        })
      }
    },
    components: {
      musicList
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable.less';

  .singer-detail {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
    transform: translateX(0)
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(100%)
  }
</style>
