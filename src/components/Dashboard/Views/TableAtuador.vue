<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {HTTP} from '../../../http-custom'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['_Id', 'Valor', 'Time']
  export default {
    components: {
      PaperTable
    },
    created () {
      HTTP.get('atuador').then(
        res => {
          this.table1.data = res.data
        }, res => {
        this.statusServidor = false
      })
    },
    data () {
      return {
        table1: {
          title: 'Atuador',
          subTitle: '',
          columns: [...tableColumns],
          data: []
        }
      }
    }
  }

</script>
<style>

</style>
