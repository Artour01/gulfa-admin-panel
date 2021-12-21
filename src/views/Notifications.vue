<template>
  <div id="notifications">
    currentNotificationId: {{currentNotificationId}}
    <TopRow
        @search="searchValue = $event"
        :btn-background="'#ED1C24'"
        btn-text="Create New Notification"
        @btn-click="showAddNotification = true"
    />
    <el-table
        :data="getNotifications(searchValue)"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          width="170"
          prop="postedTime"
          label="Date&Time">
      </el-table-column>
      <el-table-column
          prop="body"
          label="Description">
      </el-table-column>
      <el-table-column width="90">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="openConfirmWindow(scope.row.id)"
          ><img src="../assets/icons/trash-can.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-notification v-if="showAddNotification" v-model="showAddNotification"/>

    <confirmation-window
        dialogText="delete current notification"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteCurrentNotification}"
    />
  </div>
</template>

<script>
import AddNotification from "../components/notifications/AddNotification";

import TopRow from "@/components/helpers/TopRow";
import {mapActions, mapGetters} from 'vuex'
import ConfirmationWindow from '../components/ConfirmationWindow'

export default {
  name: "Notifications",
  components: {
    ConfirmationWindow,
    AddNotification,
    TopRow,
  },
  data() {
    return {
      titles: [
        'Date&Time',
        'Description'
      ],
      searchValue: '',
      showAddNotification: false,
      dialogVisible: false,
      currentNotificationId: null,
    }
  },
  async created() {
    await this.fetchNotifications()
  },
  computed: {
    ...mapGetters(['getNotifications'])
  },
  methods: {
    ...mapActions(['deleteNotification', 'fetchNotifications']),
    async deleteCurrentNotification() {
      await this.deleteNotification(this.currentNotificationId)
      this.closeConfirmWindow()
    },
    closeConfirmWindow() {
      this.dialogVisible = false
    },
    openConfirmWindow(id) {
      console.log('WWWWWWWWW', id)
      this.currentNotificationId = id
      this.dialogVisible = true
    }
  },
}
</script>

<style>

</style>
