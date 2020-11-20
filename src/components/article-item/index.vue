<template>
  <van-cell class="article-item">
    <!-- <div slot="title" class="title">{{ article.title }}</div>
     -->
     <div slot="title" class="title van-multi-ellipsis--l3" >你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</div>
    <div slot="label">
      <div 
        class="cover-wrap" 
        v-if="article.cover.type === 3"
      >
        <div class="cover-wrap-item">
          <van-image 
            fit="cover"
            class="right-cover"
            v-for="(img,index) in article.cover.images"
            :key="index"
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
      fit="cover"
      width="116" 
      height="73"  
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
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;

      .right-cover{
        width: 116px; 
        height: 73px;
      }
    }
    
  }



</style>