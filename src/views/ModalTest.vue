<template>
  <section id="test">
    <button @click="opened = true">Open</button>
    
  </section>
</template>

<script>
export default {
  name: 'ModalTest',
  data() {
    return {
      opened: false,
    }
  },
}
</script>
