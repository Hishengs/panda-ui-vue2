<template>
  <div id="Notice">
    <h2>Notice 通知</h2>
    
    <h3>使用</h3>
    <Button type="primary" @click="showNotice">显示 Notice</Button>
    <!-- code -->
    <!-- <pre>
      <code class="html">
        &lt;Checkbox v-model="checked"&gt;果汁&lt;/Checkbox&gt;
      </code>
    </pre> -->
  </div>
</template>

<script>
  let id = 0;
  const intro = `
  《冰与火之歌》的故事发生在一个虚幻的中世纪世界，主要目光集中在西方的“日落王国”——维斯特洛大陆上，讲述那里的人在当时的政治背景下的遭遇和经历。故事通过不同人物的第三人称视点（POV写法）来进行叙述，每个视点的主观性（和不可靠性）都很强。《冰与火之歌》的故事主要围绕三条主线发展：
  第一条主线围绕着各方诸侯意图问鼎整个王国的权力中心——铁王座而进行“权力的游戏”王朝斗争的故事展开。已出版的五卷书主要描写在维斯特洛全境爆发的大内战——五王之战的前后经过以及各个主要家族间的明争暗斗。故事情节主要从史塔克家族和兰尼斯特家族（分别影射玫瑰战争中的约克家族和兰开斯特家族）双方众多成员的视点出发，此外再加上其余家族的一些人物的叙述。这条故事线是着笔最多的一条，也是整个小说系列的主体思想所在。
  `;
  export default {
    methods: {
      showNotice () {
        this.$notify({
          title: `测试标题${++id}`,
          content: intro,
          duration: 0
        });
      }
    }
  };
</script>