<script setup lang="ts">
import { now } from '~/state'
import { t } from '~/i18n'
import { START_DATE } from '~/logic'

const ms = computed(() => 86400000 - (+now.value.getTime() - +START_DATE.getTime()) % 86400000)
// console.log({now: now.value, START_DATE, nowDefault: nowDefault.value, ms, cha: ((+now.value.getTime() - +START_DATE.getTime()) % 86400000) / 3600000});
const formatted = computed(() => {
  const h = Math.floor((ms.value % 86400000) / 3600000)
  const m = Math.floor((ms.value % 3600000) / 60000)
  const s = Math.floor((ms.value % 60000) / 1000)
  return t('time-format', h, m.toString().padStart(2, '0'), s.toString().padStart(2, '0'))
})
</script>

<template>
  <div pt12 pb16>
    <div flex="~ col" items-center>
      <ShareButton m4 />
      <ToggleMask :hint="true" />
    </div>

    <div h-1px w-10 border="t base" mt4 mb6 mxa />

    <div flex="~ col center" relative>
      <div op50 ws-nowrap>
        {{ t('next-note') }}
      </div>
      <div text-lg ws-nowrap style="font-variant-numeric: tabular-nums;">
        {{ formatted }}
      </div>
    </div>
  </div>
</template>
