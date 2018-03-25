<template>
  <stats-card>
    <div class="icon-big text-center" :class="`icon-${type}`" slot="header">
      <i :class="icon"></i>
    </div>
    <div class="numbers" slot="content">
      <p>{{title}}</p>
      {{value}}{{sufixo}}
    </div>
    <div class="stats" slot="footer">
      <i :class="footerIcon"></i> {{footerText}}
    </div>
  </stats-card>
</template>
<script>
  import StatsCard from './StatsCard.vue'
  export default {
    components: {
      StatsCard
    },
    props: ['type', 'icon', 'title', 'value', 'sufixo', 'footerIcon', 'footerText'],
    name: 'info-card'
  }

</script>
<style>

</style>
