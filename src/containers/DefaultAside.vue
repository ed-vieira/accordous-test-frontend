<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <i class='icon-list'></i>
      </template>
      <b-list-group class="list-group-accent">
      </b-list-group>
    </b-tab>
    <b-tab>
      <template slot="title">
        <i class='icon-speech'></i>
      </template>
      <div class="p-3">
      </div>
    </b-tab>
    <b-tab>
      <template slot="title">
        <i class='icon-settings'></i>
      </template>
      <div class="p-3">

      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
export default {
  name: 'DefaultAside',
  components: {
    cSwitch
  }
}
</script>
