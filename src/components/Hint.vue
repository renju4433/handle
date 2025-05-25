<script setup lang="ts">
import { answer, dayNoHanzi, hint, parseWord } from '~/state'
import { meta } from '~/storage'
import { t } from '~/i18n'

const parsed = computed(() => parseWord(hint.value, answer.value.word)[0])
const masked = computed(() => ({
  ...parsed.value,
  char: '?',
}))
const { descriptionHintText, descriptionHintUrl } = answer.value
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <p><b>{{ dayNoHanzi }}</b></p>
    <div v-if="meta.hintLevel >= 1">
      {{ t('hint-range') }}<a :href="descriptionHintUrl" target="_blank" style="text-decoration: underline">{{ descriptionHintText }}</a>
    </div>
  </div>
</template>
