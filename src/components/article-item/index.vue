<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title+'dsadadasdasdasdasdasds' }}</div>
    <div slot="label">
      <div 
        class="cover-wrap" 
        v-if="article.cover.type === 3"
      >
        <div 
          class="cover-wrap-item"
          v-for="(img,index) in article.cover.images"  
          :key="index"
        >
          <van-image 
            class="cover-item"
            fit="cover"
            :src="img" 
          />
        </div>
      </div>

      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.collect_count }}</span>
        <span>{{ article.pubdate }}</span>
      </div>
      
    </div>

    <!-- 默认插槽的名字叫 default，可以省略 -->
    <van-image 
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]" 
    />
  </van-cell>
</template>

<script>
  export default {
    name: 'ArticleItem',
    components: {},
    props: {
      article: {
        type: Object,
        required: true,

      }
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .article-item{
    .title {
      font-size: 16px;
      color: #3a3a3a;
    }
    .van-cell__value{
      flex: 1;
      width: 116px;
      height: 73px;
      margin-left: 12px;

      .right-cover{
        width: 116px; 
        height: 73px;
      }
    }
    .cover-wrap {
      padding: 15px 0;
      display: flex;
      /deep/.cover-wrap-item {
        flex: unset;
        height: 73px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item {
          width: 100%;
          height: 73px;
        }

      }
    }
    
  }



</style>