<template>
  <div id="Drawer">
    <h2>Drawer 抽屉</h2>
    
    <h3>默认</h3>
    <panda-drawer v-model="showDrawer" :title="title">{{ intro }}</panda-drawer>
    <panda-button @click="showDrawer=true" type="primary">显示 panda-drawer</panda-button>

    <h3>closable</h3>
    <panda-drawer v-model="showDrawer1" :title="title" :closable="false">{{ intro }}</panda-drawer>
    <panda-button @click="showDrawer1=true" type="primary">无关闭按钮，点击遮罩关闭</panda-button>

    <h3>mask-closable</h3>
    <panda-drawer v-model="showDrawer2" :title="title" :mask-closable="false">{{ intro }}</panda-drawer>
    <panda-button @click="showDrawer2=true" type="primary">点击遮罩不可关闭</panda-button>

    <h3>自定义 footer</h3>
    <panda-drawer v-model="showDrawer3" :title="title">
      {{ intro }}
      <div slot="footer">
        <panda-button @click="showDrawer3=false" type="primary">确定</panda-button>
        <panda-button @click="showDrawer3=false" type="text">取消</panda-button>
      </div>
    </panda-drawer>
    <panda-button @click="showDrawer3=true" type="primary">自定义 footer</panda-button>

    <h3>位置 position="left | right" 默认 right</h3>
    <panda-drawer v-model="showDrawer4" :title="title" position="left">{{ intro }}</panda-drawer>
    <panda-button @click="showDrawer4=true" type="primary">左边显示</panda-button>

    <h4>Props</h4>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>value</td>
        <td>通过 v-model 控制显示隐藏</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可通过按钮关闭</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>mask-closable</td>
        <td>是否可通过点击遮罩层关闭</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>position</td>
        <td>显示位置，支持 left | right</td>
        <td>String</td>
        <td>right</td>
      </tr>
    </table>
  </div>
</template>

<script>
const intro = `
《冰与火之歌》的故事发生在一个虚幻的中世纪世界，主要目光集中在西方的“日落王国”——维斯特洛大陆上，讲述那里的人在当时的政治背景下的遭遇和经历。故事通过不同人物的第三人称视点（POV写法）来进行叙述，每个视点的主观性（和不可靠性）都很强。《冰与火之歌》的故事主要围绕三条主线发展：
第一条主线围绕着各方诸侯意图问鼎整个王国的权力中心——铁王座而进行“权力的游戏”王朝斗争的故事展开。已出版的五卷书主要描写在维斯特洛全境爆发的大内战——五王之战的前后经过以及各个主要家族间的明争暗斗。故事情节主要从史塔克家族和兰尼斯特家族（分别影射玫瑰战争中的约克家族和兰开斯特家族）双方众多成员的视点出发，此外再加上其余家族的一些人物的叙述。这条故事线是着笔最多的一条，也是整个小说系列的主体思想所在。
第二条主线围绕着镇守七大王国北疆要塞绝境长城的守夜人在与塞外野人对抗并对南方政治置身事外的同时，试图抵御消隐八千年后卷土重来、意图借着长冬入侵杀光所有人类的异鬼的威胁。长城一线的故事主要出自于艾德·史塔克的私生子琼恩·雪诺和他的好友山姆威尔·塔利的视点。从第三卷开始，本来保持永久中立的守夜人也不由自主的受到了南方内战的波及影响，特别是五王之战中的一王——史坦尼斯·拜拉席恩率兵北上驰援长城之后。整个小说的魔幻色彩主要来源于此故事线。
第三条主线则设定于维斯特洛东面的另一大陆——厄索斯，主要围绕着坦格利安家族仅存的成员丹妮莉丝·坦格利安在重新孵化出龙后，意图东山再起夺回维斯特洛政权的经历。这条故事线在小说系列的绝大部分篇幅中独立于其他两条主线。但是在小说后期，其他故事线中的角色也开始参入这条主线。
`;

export default {
  data () {
    return {
      title: '冰与火之歌',
      intro,
      showDrawer: false,
      showDrawer1: false,
      showDrawer2: false,
      showDrawer3: false,
      showDrawer4: false,
    };
  }
};
</script>