<script setup lang="ts">
import confetti from 'canvas-confetti'
import { answer, dayNo, isDev, isFailed, isFinished, isPassed, showCheatSheet, showFailed, showHelp, showHint } from '~/state'
import { hardMode, markStart, meta, tries } from '~/storage'
import { t } from '~/i18n'
import { TRIES_LIMIT, WORD_LENGTH } from '~/logic'

const el = ref<HTMLInputElement>()
const input = ref('')
const inputValue = ref('')

const isFinishedDelay = debouncedRef(isFinished, 800)

const names = ['江齐文', '倪仲星', '韦振强', '黄立勤', '黄圣明', '林书玄', '何舒军', '凌世杰', '艾显平', '李小青', '张轶峰', '符轩齐', '汪清清', '黄金贤', '章小剑', '焦政瑞', '陈科翰', '林皇羽', '谢维祥', '简咏璇', '沈兰心', '徐嘉琦', '郑蔚楠', '黄健光', '朱建锋', '毛玮铭', '兰志仁', '杨听雨', '万俊宏', '奚振扬', '钟煜阳', '黄宇峰', '贺启发', '蔡子扬', '张益丰', '蒙杰焕', '金洪利', '唐世祺', '樊星岑', '黄益苗', '霍九旭', '黄琼莹', '何其强', '张玉灏', '吴志琴', '范家豪', '于俊艺', '徐建鑫', '董新武', '康庭瑞', '殷立成', '葛凌峰', '陶俊吉', '郑睦融', '丁泽宇', '徐毅宽', '游天龙', '刘邵琪', '严雅丽', '谭鑫麟', '王启超', '于亚君', '黄湘凝', '洪士光', '杨子煊', '肖卢卡', '朱天逸', '黄彦桦', '田昊洋', '周陈立', '朱佳颐', '沈诣航', '李嘉骏', '王博文', '卢炜元', '成艳珍', '张瑞扬', '程梓航', '廖豊嘉', '董家豪', '王烨林', '杨裕雄', '李伯来', '王弈霖', '刘梦云', '贺禹成', '马宏洲', '夏建晋', '张俊宇', '潘冠臣', '师晓林', '王有志', '谢增忠', '邓园羲', '金弘韬', '彭程锦', '乔明天', '沈天佐', '姚宇杰', '张欣怡', '王珂苗', '黄大兴', '朱泓铭', '廖镇焕', '胡晋瑞', '朱彦丞', '马晨致', '许志含', '郑逸宁', '廖仲彦', '张致远', '范玮宸', '阮瑾潼', '周吴彬', '陈浩源', '樊非凡', '袁华俊', '柯芳颖', '查全宁', '陈梓涵', '周思哲', '刘传星', '李锦尚', '杨昕霖', '张怀瑾', '王毓熙', '杨镒萌', '林奕忠', '董晨瑛', '郑笑阳', '朱小娟', '王嘉一', '冯律驰', '黄俊铭', '喻常轩', '罗文妙', '范宣佐', '邱彧瑾', '赵有嘉', '余群秋', '郭韧恒', '廖蕴彤', '罗振轩', '潘绍钦', '岑活愉', '程华滨', '张梓溢', '宋婵娟', '张纪国', '郭玉昆', '王俊锴', '黄洛桐', '孙斯亮', '温永彩', '刘华军', '吴开河', '张郅皓', '林国玲', '刘嘉圣', '林熙蒙', '秦邵雅', '陈子敏', '董家怡', '方关平', '张晓霞', '王维实', '马望越', '樊宇天', '李子舜', '张沐忆', '张云舒', '宋晓颖', '郭伟华', '沈天佑', '黄李娜', '王清乐', '郭海森', '赵钰彬', '刘洪平', '林鑫鹏', '刘晋峰', '喻小米', '傅之轩', '叶晟亨', '邱吴祥', '施翘楚', '吴保刚', '杨文钧', '宋翎嘉', '周奕成', '张天瑜', '郝天一', '李子睿', '刘相伯', '李源浩', '宋睿洋', '刘书正', '柳泷博', '车百康', '薛鑫泽', '李梓翰', '刘议中', '邬彦皓', '李晓芳', '吴晓宁', '刘澔叡', '卞雨晨', '龙鑫华', '魏子淇', '江筱瑜', '黄修一', '朱兆云', '刘伊涵', '杨昊楠', '吴政昌', '吴函樾', '张潇婷', '蔡尚柱', '陈冠辉', '夏楷迪', '李岳宁', '王思淼', '詹玄维', '张世超', '俞振林', '曹雪钰', '于智洋', '林奇霖', '苏梓航', '解皓阳', '马亦泽', '张培培', '郑沛东', '吴泓一', '刘昶彤', '陈君浩', '肖伊康', '姚志勇', '史旭东', '朱骊冰', '林巧盈', '迟运泽', '张方正', '赵凌璇', '梁思洁', '孟凡尘', '曲照东', '沈卓晟', '李金泽', '张裕茹', '史钧帆', '刘文博', '简林泽', '朱嘉圆', '宋佩蓉', '刘敏逸', '王春谱', '张朕嘉', '高嘉璇', '韩依锐', '范钰琪', '姚名杨', '牛天圻', '史玉彤', '朱珂依', '朱明辉', '孙崇杰', '郭凯明', '提泽卿', '缪芮馨', '田汉法', '钟保贵', '吴丽娜', '许鹏伟', '吴彬彬', '李闻达', '蓝芊羽', '熊羡柔', '梁皓博', '周天宥', '胡誉瀚', '马铂沈', '李昊洋', '王鹏淏', '连鹤淇', '袁启珣', '黄荻翘', '李承泽', '唐子钦', '刘芮西', '王邵乐', '许业鹏', '刘梓莹', '戴如周', '李沛扬', '刘思齐', '曾飞戈', '张雨帆', '张芷伊', '雷宏英', '李静辉', '陈梓宣', '张文亮', '庄义翔', '冯柏潼', '贡酉辰', '李伊檬', '黄一铭', '朱烝绪', '陈隆泉', '史宇轩', '詹子鹏', '刘壹圣', '李一龙', '陈锦超', '杨紫婷', '胡艺晗', '陶怿然', '赵新野', '张晰杰', '杨紫煜', '沈天然', '吴隽朗', '陈凯迪', '周泽群', '何静琳', '朱玥盈', '章一诺', '朱诗朗', '苏鹏蕴', '杨敬禹', '黄思幂', '邓羽舒', '李世轩', '罗明焱', '尹一帆', '汪昊妍', '赖以心', '丁楷伦', '张洁妍', '邝正言', '陈柔妤', '吴宇涵', '张歆淇', '洪承志', '赵海霞', '徐旨乐', '胡家祎', '王春旭', '林敬杰', '孙立京', '梁晋铭', '李雪竹', '伍政禧', '何诺轩', '张红梅', '范智宜', '王昺翔', '许嘉俊', '丁相匀', '王恒瑞', '喻九宁', '潘奕璇', '傅彦凯', '王睿希', '杨镒菲', '黄圣勋', '陈上扬', '李善弘', '梁金生', '王洪军', '范雨鑫', '张兆锋', '陈上礼', '黄晓淇', '庄友良', '陈亭玥', '兰昕蕾', '孙培刚', '封东邑', '王佳怡', '郝培源', '王芷奇', '黄宝辉', '李梓钺', '伍俊豪', '王曼妮', '苏紫敬', '钟隽为', '赵林惇', '梁家荣', '李九言', '袁雪鹏', '吕润生', '韩毅宸', '张守畅', '陈梓燊', '姚均达', '马蓁怡', '蔡倬尧', '朱震军', '张易恬', '麦俊毅', '卢乐悠', '袁沛平', '李甄正', '张棕皓', '张芯蕊', '陈奕铭', '胡一一', '龚悦诚', '钟天泽', '何彦乐', '徐夕雅', '马世卫', '杨子珺', '林晅羽', '陈嘉逸', '梁哲尚', '朱晓莹', '陈则亦', '陈乐祈', '傅紫萱', '徐海祐', '闫静祎', '张梓乐', '张渝杨', '葛雨薇', '陈俊宇', '廖铠岚', '孟思彤', '聂赫宏', '刘林君', '张育铨', '张心甜', '梁尚麟', '周楚乔', '郭馨璐', '杨尚霖', '林晞阳', '杨皓哲', '杨学睿', '麦俊希', '彭秋傅', '郑铟彤', '崔展铭', '朱嘉铭', '项梓芮', '周笑妍', '邢书瑜', '冯玺多', '朱玥澄', '张禛熹', '袁孟新', '陈茵荞', '陆一瀚', '梁日诚', '任书娴', '潘晓乐', '郭盛滨', '吴羿驰', '王亦奇', '黎若翘', '宗益成', '宁子璇', '孔钰婷', '姚元瀚', '叶礼瑞', '张清杨', '王俊轩', '单彦菲', '周旭红', '谭易谦', '李諾琛', '高宇暄', '黄灏正', '郑昊昕', '徐乐津', '郭采卿', '李栩乐', '周楷焮', '王芳原', '殷子蠡', '陈鹤珣', '梁凯晴', '吴孝谦', '王思嵘', '韩一僮', '刘梓渘', '张春霞', '郑承熹', '黄儁铭', '黄金钰', '张芸箬', '施懿罡', '赵天瑜', '吕安彦', '钟汶诺', '周思涵', '王昱青', '易沚禧', '冯悦贤', '余力泓', '孟泉成', '萧正铧', '冯梓鸣', '黄梓桓', '林昕澄', '李深宥', '李紫瑾', '朱晓进', '刘晏诚', '沈以恆', '郝雨卿', '宫依轩', '李俊彦', '王紫默', '郑宇轩', '施明竣', '李可心', '查瑾恬', '宋雨萌', '谢荣国', '周烨彬', '梁志美', '殷彩英', '朱美珊', '侯琦萱', '郝宗祥', '孔庆铨', '黄悦诚', '曹家根', '陈昱至', '张铁良', '施咏婷', '江灯辉', '陈洛婷', '朱翱曦', '叶汉辰', '楚明骏', '陈鹤珺', '王胤弘', '谭以歌', '沈梓洋', '魏承乾', '解恩齐', '陈威至', '陈一帆', '许瑞明', '许子昊', '麦俊峰', '周正熹', '何睿霖', '何彦希', '牛语昕', '陈俊翰', '李姿颖', '王雨泽', '何峻骞', '林敬淞', '周灏贤', '区奕晞', '林宸億', '赵沛淇', '曾愷晙', '刘潇阳', '叶心悠', '赵亦安', '邝子轩', '林筱宜', '施咏琳', '段景兰', '雒梦泽', '陈柏言', '张右辰', '梁境皓', '胡溢晴', '陈上懿', '聂宇辰', '李泽勖', '王梓诺', '陈星霖', '何颜良', '陈旖荞', '汪俊羲', '钟智濠', '许登科', '李承峰', '李子尧', '阙炜祺', '李成熙', '周灏澧', '李奕伦', '梁尚麒', '陈恩祈', '郭恒立', '钱经天', '李祖明', '刘羿弦', '郎瑾瑜', '袁梓峰', '沈伽睿', '张善柔', '吴家琪', '常名昊', '胡溢朗', '赵晞彤', '易裕洋', '李甄善', '余耀华', '林诗棋', '邓博骏', '孙世轩', '王俊浩', '孙量宇']

function go() {
  if (input.value.length !== WORD_LENGTH)
    return
  if (!names.includes(input.value)){
    alert('不存在该棋手或该棋手没有国际等级分')
    return
  }
  tries.value.push(input.value)
  input.value = ''
  inputValue.value = ''
}
function reset() {
  tries.value = []
  meta.value = {}
  input.value = ''
  inputValue.value = ''
}
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = Array.from(el.value)
    .filter(i => /\p{Script=Han}/u.test(i))
    .slice(0, 4)
    .join('')
  markStart()
}
function focus() {
  el.value?.focus()
}
function hint() {
  meta.value.hint = true
  if (!meta.value.hintLevel)
    meta.value.hintLevel = 1
  showHint.value = true
}
function sheet() {
  showCheatSheet.value = true
}
function congrats() {
  const defaults = {
    colors: [
      '#5D8C7B',
      '#F2D091',
      '#F2A679',
      '#D9695F',
      '#8C4646',
    ],
    shapes: ['square'],
    ticks: 500,
  } as confetti.Options
  confetti({
    ...defaults,
    particleCount: 80,
    spread: 100,
    origin: { y: 0 },
  })
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 50,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
    })
  }, 250)
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
    })
  }, 400)
}

watch(isPassed, (v) => {
  if (v)
    setTimeout(congrats, 300)
}, { flush: 'post' })

watchEffect(() => {
  if (!showHelp.value)
    focus()
})

watchEffect(() => {
  if (isFailed.value && !meta.value.failed) {
    meta.value.failed = true
    setTimeout(() => {
      showFailed.value = true
    }, 1200)
  }
})
</script>

<template>
  <div>
    <div flex="~ col" pt4 items-center>
      <WordBlocks v-for="w,i of tries" :key="i" :word="w" :revealed="true" @click="focus()" />

      <template v-if="meta.answer">
        <div my4>
          <div font-serif p2>
            {{ t('correct-answer') }}
          </div>
          <WordBlocks :word="answer.word" />
        </div>
      </template>

      <WordBlocks v-if="!isFinished" :word="input" :active="true" @click="focus()" />

      <div mt-1 />

      <Transition name="fade-out">
        <div v-if="!isFinished" flex="~ col gap-2" items-center>
          <input
            ref="el"
            v-model="inputValue"
            type="text"
            autocomplete="false"
            outline-none
            :placeholder="t('input-placeholder')"
            w-86 p3
            border="2 base"
            text="center"
            bg="transparent"
            :disabled="isFinished"
            @input="handleInput"
            @keydown.enter="go"
          >
          <button
            mt3
            btn p="x6 y2"
            :disabled="input.length !== WORD_LENGTH"
            @click="go"
          >
            {{ t('ok-spaced') }}
          </button>
          <div v-if="tries.length > 4 && !isFailed" op50>
            {{ t('tries-rest', TRIES_LIMIT - tries.length) }}
          </div>
          <button v-if="isFailed" square-btn @click="showFailed = true">
            <div i-mdi-emoticon-devil-outline /> {{ t('view-answer') }}
          </button>

          <div flex="~ center" mt4 :class="isFinished ? 'op0! pointer-events-none' : ''">
            <button v-if="!hardMode" mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="hint()">
              <div i-carbon-idea /> {{ t('hint') }}
            </button>
            <button mx2 icon-btn text-base pb2 gap-1 flex="~ center" @click="sheet()">
              <div i-carbon-grid /> {{ t('cheatsheet') }}
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="isFinishedDelay && isFinished">
          <ResultFooter />
          <Countdown />
        </div>
      </Transition>

      <template v-if="isDev">
        <div h-200 />
        <div op50 mb-2>
          测试用
        </div>
        <div flex gap2>
          <a
            class="btn"
            :href="`/?dev=hey&d=${dayNo - 1}`"
          >
            上一天
          </a>
          <button
            class="btn"
            @click="reset"
          >
            重置
          </button>
          <a
            class="btn"
            :href="`/?dev=hey&d=${dayNo + 1}`"
          >
            下一天
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.fade-enter-active {
  transition: all 1s ease;
}
.fade-out-leave-active {
  transition: all 0.5s ease;
}

.fade-out-leave-to,
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
