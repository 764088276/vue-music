<template>
  <transition name="slide">
    <music-list :name="title" :bgImage="bgImage" :songs="rankSong" :rank="true"></music-list>
  </transition>
</template>

<script type="text/javascript">
  import musicList from 'components/musicList/musicList'
  import {mapGetters} from 'vuex'
  import {getRankDetail} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'assets/js/song'

  export default{
    data(){
      return {
        rankSong: [],
        title: '',
        bgImage: ''
      }
    },
    computed: {
      ...mapGetters([
        'rankList'
      ])
    },
    created(){
      this._getRankDetail()
    },
    methods: {
      _getRankDetail(){
        if (!this.rankList.id) {
          this.$router.push('/rank');
          return
        }
        getRankDetail(this.rankList.id).then(res => {
          if (res.code === ERR_OK) {
            res.songlist.forEach((item) => {
              this.rankSong.push(createSong(item.data))
            });
            this.title = res.topinfo.ListName;
            this.bgImage = res.topinfo.pic_album;
          }
        })
      }
    },
    components: {
      musicList
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
    transform: translate3d(0, 0, 0);
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
