<template>
    <v-container>
    <div>
        <v-tabs
          v-model="tab"
          color="green"
          grow
        >
          <v-tabs-slider color="red"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
  </div>
   <Room v-bind:idroom='item' :key='roomid' ref='room'></Room>
  </v-container>
</template>

<script>
import Room from './Room'
export default {
  components: { Room },
  data () {
    return {
      roomid: '',
      items: ['A', 'B', 'C', 'D', 'E', 'F'],
      tab: null
    }
  },
  created () {
    this.tab = this.$store.get('tab')
    console.log(this.tab)
  },
  watch: {
    tab () {
      this.roomid = this.items[this.tab]
      this.$refs.room.refresh()
      this.$store.set('roomid', this.items[this.tab])
      // this.$refs.room.render()
    }
  }
}
</script>

<style>

</style>
