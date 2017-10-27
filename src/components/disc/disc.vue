<template>
    <transition name="slide">
      <music-list :name="name" :bgImage="bgImage" :songs="songList"></music-list>
    </transition>
</template>

<script type="text/javascript">
  import musicList from 'components/musicList/musicList'
  import {getDiskSongList} from 'api/recommend'
  import {mapGetters} from 'vuex'
  import {createSong} from 'assets/js/song'
  import {ERR_OK} from 'api/config'

  export default{
    data(){
      return {
        songList: [],
        bgImage: '',
        name: ''
      }
    },
    created(){
      this._getDiskSongList();
    },
    computed: {
      ...mapGetters([
        'disc'
      ])
    },
    mounted(){
      this.bgImage = this.disc.cover;
      this.name = this.disc.title;
    },
    methods: {
      _getDiskSongList(){
        if (!this.disc.content_id) {
          this.$router.push('/recommend');
          return
        }
        getDiskSongList(this.disc.content_id).then(res => {
          if (res.data.code === ERR_OK) {
            res.data.songlist.forEach((item) => {
              this.songList.push(createSong(item))
            });
          }

        })
      },
      enter(){
        console.log('enter')
      },
      leave(){
        console.log('leave')
      }
    },
    components: {
      musicList
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active {
    transform: translateX(0);
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(100%)
  }
</style>
