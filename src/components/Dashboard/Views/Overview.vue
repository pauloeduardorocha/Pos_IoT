<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <info-card type="success" icon="ti-signal" title="Temperatura" :value="ultimaTemperatura"
                   :sufixo="ultimaTemperatura ? 'ºc' : 'N/D'" footerIcon="ti-reload" footerText="última amostra"/>
      </div>
      <div class="col-lg-3 col-sm-6">
        <info-card type="info" icon="ti-cloud" title="Umidade" :value="ultimaUmidade"
                   :sufixo="ultimaUmidade ? '%': 'N/D'" footerIcon="ti-reload" footerText="última amostra"/>
      </div>
      <div class="col-lg-3 col-sm-6">
        <info-card type="warning" icon="ti-pulse" title="Atuador" :value="ultimaAtuador === '1' ? 'On' : 'Off'"
                   sufixo="" footerIcon="ti-reload" footerText="estado atual"/>
      </div>
      <div class="col-lg-3 col-sm-6">
        <info-card :type="statusServidor ? 'success':'danger'" icon="ti-server" title="Servidor" :value="statusServidor ? 'On':'Off'"
                   sufixo="" footerIcon="ti-reload" footerText="última amostra"/>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-xs-12">
        <chart-card :chart-data="temperaturas" :chart-options="options" v-if="temperaturas">
          <h4 class="title" slot="title">Ultimas medições de temperatura</h4>
          <span slot="subTitle"> </span>
          <span slot="footer">
            <i class="ti-reload"></i> Atualizado a cada 30 segundos</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Temperatura
          </div>
        </chart-card>
      </div>

      <div class="col-xs-12">
        <chart-card :chart-data="umidades" :chart-options="options"  v-if="umidades">
          <h4 class="title" slot="title">Ultimas medições de umidade</h4>
          <span slot="subTitle"> </span>
          <span slot="footer">
            <i class="ti-reload"></i> Atualizado a cada 30 segundos</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Umidade
          </div>
        </chart-card>
      </div>

      <div class="col-xs-12">
        <chart-card :chart-data="atuadores" :chart-options="options"  v-if="atuadores">
          <h4 class="title" slot="title">Histórico do Atuador</h4>
          <span slot="subTitle">
            <!--<md-radio v-model="ultimaAtuador" value="-1" @change="novo('atuador', -1)">Auto</md-radio>-->
            <md-radio v-model="ultimaAtuador" value="0"  @change="novo('atuador', 0)">Off</md-radio>
            <md-radio v-model="ultimaAtuador" value="1"  @change="novo('atuador', 1)">On</md-radio>
          </span>
          <span slot="footer">
            <i class="ti-reload"></i> Atualizado a cada 30 segundos</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Estado do Atuador
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import InfoCard from 'components/UIComponents/Cards/InfoCard.vue'
  import {HTTP} from '../../../http-custom'
  import formMixin from '../../../mixins/form'
  export default {
    mixins: [formMixin],
    components: {
      ChartCard,
      InfoCard
    },
    created () {
      clearInterval(this.intervaloConsulta)
      this.consultarServidor()
      this.intervaloConsulta = setInterval(this.consultarServidor(), 30000)
    },
    methods: {
      consultarServidor () {
        HTTP.get('temperatura?_limit=10').then(
          res => {
            let aux = res.data.reverse()
            res.data = aux
            this.temperaturas.series[0] = res.data.map(function (elem) {
              return elem.valor
            })
            this.temperaturas.labels = res.data.map(function (elem) {
              if (elem.time) {
                return new Date(elem.time).getDate() + '/' + new Date(elem.time).getMonth() + '/' + new Date(elem.time).getFullYear() + '<br/>' + new Date(elem.time).getHours() + ':' + new Date(elem.time).getMinutes() + ':' + new Date(elem.time).getSeconds()
              } else {
                return 'n/d'
              }
            })
            this.ultimaTemperatura = this.temperaturas.series[0][this.temperaturas.series[0].length - 1]
          }, res => {
          this.statusServidor = false
        })
        HTTP.get('umidade?_limit=10').then(
            res => {
              let aux = res.data.reverse()
              res.data = aux
              this.umidades.series[0] = res.data.map(function (elem) {
                return elem.valor
              })
              this.umidades.labels = res.data.map(function (elem) {
                if (elem.time) {
                  return new Date(elem.time).getDate() + '/' + new Date(elem.time).getMonth() + '/' + new Date(elem.time).getFullYear() + '<br/>' + new Date(elem.time).getHours() + ':' + new Date(elem.time).getMinutes() + ':' + new Date(elem.time).getSeconds()
                } else {
                  return 'n/d'
                }
              })
              this.ultimaUmidade = this.umidades.series[0][this.umidades.series[0].length - 1]
            }, res => {
          this.statusServidor = false
        })
        HTTP.get('atuador?_limit=10').then(
          res => {
            let aux = res.data.reverse()
            res.data = aux
            this.atuadores.series[0] = res.data.map(function (elem) {
              return elem.valor
            })
            this.atuadores.labels = res.data.map(function (elem) {
              if (elem.time) {
                return new Date(elem.time).getDate() + '/' + new Date(elem.time).getMonth() + '/' + new Date(elem.time).getFullYear() + '<br/>' + new Date(elem.time).getHours() + ':' + new Date(elem.time).getMinutes() + ':' + new Date(elem.time).getSeconds()
              } else {
                return 'n/d'
              }
            })
            this.ultimaAtuador = this.atuadores.series[0][this.atuadores.series[0].length - 1]
          }, res => {
          this.statusServidor = false
        })
      }
    },
    data () {
      return {
        intervaloConsulta: null,
        ultimaTemperatura: null,
        ultimaUmidade: null,
        ultimaAtuador: null,
        statusServidor: true,
        temperaturas: {
          labels: [],
          series: []
        },
        umidades: {
          labels: [],
          series: []
        },
        atuadores: {
          labels: [],
          series: []
        },
        options: {
          showArea: false,
          height: '245px',
          axisX: {
            showGrid: false
          },
          lineSmooth: this.$Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      }
    }
  }

</script>
<style>

</style>
