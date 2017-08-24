<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-12">
        <vuestic-alert type="success" :withCloseBtn="true">
          <span class="badge badge-pill badge-success">SUCCESS</span>
          You successfully read this important alert message.
          <i class="fa fa-close alert-close"></i>
        </vuestic-alert>
      </div>
    </div>

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="['Overview', 'Setup Profile']" ref="tabs">
        <div slot="Overview">
          <overview-tab @explore="explore"></overview-tab>
        </div>
        <div slot="Setup Profile">
          <setup-profile-tab></setup-profile-tab>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

    <dashboard-bottom-widgets></dashboard-bottom-widgets>

  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import VuesticTabs from '../vuestic-components/vuestic-tabs/VuesticTabs.vue'
  import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
  import OverviewTab from './overview-tab/OverviewTab.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  export default {
    name: 'dashboard',
    components: {
      VuesticWidget,
      VuesticAlert,
      DashboardInfoWidgets,
      VuesticTabs,
      SetupProfileTab,
      OverviewTab,
      DashboardBottomWidgets
    },
    methods: {
      explore () {
        this.$refs.tabs.setActive('Data Visualization')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
