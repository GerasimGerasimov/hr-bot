<template>
  <div class="container">
    <div class="">
      <span
        class="font-size-48 font-weight-900"
      >
      HR-BOT
      </span>
    </div>
    <div><span>Поиск и работа с кандидатами в LinkedIn</span></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods:{
  },
  computed: {
  }
}
</script>

<style scoped>
  .container {
    background: repeating-radial-gradient(circle, var(--info-color), var(--accent-color) 10px, var(--accent-color) 10px, var(--accent-color) 20px);
    grid-column: 1/15;
    text-align: center;
    color: var(--secondary-color);
    /*background-image: radial-gradient(ellipse farthest-corner at right bottom, var(--primary-color) 0%, var(--accent-color) 50%, var(--info-color) 100%);*/
  }

</style>
