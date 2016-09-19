<template>
  <ul class="post-list reset-list">
    <li class="post-list-item" v-for="post in postList" @click="focus($index)">
      <article class="post-thumb" :class="[post['draftPublished']?'published':post['article']?'updated':'',{'active':post['id'] === currentPostId}]">
        <h3 class="post-title"><a href="javascript:;">{{post['title']}}</a></h3>
        <h6 class="post-time">{{post['lastEditTime']}}</h6>
        <p class="post-content" v-text="post['excerpt'] | md2Text">
        </p>
      </article>
    </li>
  </ul>
</template>
<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .post-list
    border-top 1px solid $border
  .post-list-item
    cursor pointer
    margin 0 25px
    padding 20px 0
    border-bottom 1px solid $border
  .post-thumb
    padding-left 5px
    &.published
      border-left 2px solid $green
    &.updated
      border-left 2px solid $yellow
    .post-title
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 16px
      line-height 1.3
      font-weight 400
      margin 0 0 4px
      padding-bottom 0
    &.active
      .post-title
        color $green
    &:hover
      .post-title
        color $green
    .post-content
      color $light
      font-size 12px
      font-weight 400
      line-height 17px
      margin 0
      max-height ( 3 * @line-height )
      overflow hidden
      word-wrap break-word
    .post-time
      color $light
      margin 0 0 6px
  .post-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
<script>
  import {focusOnPost} from '../../vuex/actions/post'
  import {currentPostId,currentPostIndex,postSaved,postList,postTitleSaved} from '../../vuex/getters/post'
  export default {
    vuex: {
      getters: {
        currentPostId,
        currentPostIndex,
        postSaved,
        postList,
        postTitleSaved
      },
      actions:{
        focusOnPost
      }
    },
    methods:{
      focus(index){
        if(!this.postSaved || !this.postTitleSaved){
          alert('当前文章正在保存中,请稍后重试');
          return;
        }
        if(index !== this.currentPostIndex){
          this.focusOnPost(index)
        }
      },
    }

  }
</script>
