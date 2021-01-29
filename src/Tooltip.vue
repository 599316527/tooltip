<template>
<div>
  <VeuiTooltip ref="tooltip" v-if="item" :target="item.el" :open.sync="open"
    trigger="hover-mousedown" @afterclose="handleAfterClose">
    <template v-if="item.type === 'image'">
      <img :src="item.content" @load="handleImageLoaded">
    </template>
    <template v-else>
      {{ item.content }}
    </template>
  </VeuiTooltip>
</div>
</template>

<script>
import {VeuiTooltip} from 'veui'

export default {
  name: 'Tooltip',
  components: {
    VeuiTooltip
  },

  data() {
    return {
      open: false,
      item: null
    }
  },
  methods: {
    handleImageLoaded() {
      this.$refs.tooltip.relocate()
    },
    handleAfterClose() {
      this.item = null
    },
    show (item) {
      this.item = item
      this.open = true
    },
    hide () {
      this.open = false
    }
  }
}
</script>

<style lang="less">
.veui-tooltip {
  max-width: 400px;

  img {
    max-width: 100%;
  }
}
</style>
