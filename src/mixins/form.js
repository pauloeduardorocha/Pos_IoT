import {HTTP} from '../http-custom'
export default {
  methods: {
    novo (collection, value) {
      HTTP.post(collection, {'valor': value}).then(res => this.notifyVue('top', 'right', res.data.message))
    },
    atualizar (id, collection, value) {
      HTTP.put(collection + '/' + id, {'valor': value}).then(res => this.notifyVue('top', 'right', res.data.message))
    },
    deletar (id, collection) {
      HTTP.delete(collection + '/' + id).then(res => this.notifyVue('top', 'right', res.data.message))
    },
    notifyVue (verticalAlign, horizontalAlign, message) {
      this.$notifications.notify(
        {
          message: message,
          icon: 'ti-check',
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: 'success'
        })
    }
  }
}
