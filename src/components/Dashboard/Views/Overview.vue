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
        <info-card type="warning" icon="ti-pulse" title="Atuador" :value="ultimaAtuador ? 'On' : 'Off'"
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
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Ultimas medições</h4>
          <span slot="subTitle"> </span>
          <span slot="footer">
            <i class="ti-reload"></i> Atualizado a cada 30 segundos</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Temperatura
            <i class="fa fa-circle text-danger"></i> Umidade
            <i class="fa fa-circle text-warning"></i> Estado do atuador
          </div>
        </chart-card>
      </div>

      <!--<div class="col-md-6 col-xs-12">-->
        <!--<chart-card :chart-data="preferencesChart.data"  chart-type="Pie">-->
          <!--<h4 class="title" slot="title">Email Statistics</h4>-->
          <!--<span slot="subTitle"> Last campaign performance</span>-->
          <!--<span slot="footer">-->
            <!--<i class="ti-timer"></i> Campaign set 2 days ago</span>-->
          <!--<div slot="legend">-->
            <!--<i class="fa fa-circle text-info"></i> Open-->
            <!--<i class="fa fa-circle text-danger"></i> Bounce-->
            <!--<i class="fa fa-circle text-warning"></i> Unsubscribe-->
          <!--</div>-->
        <!--</chart-card>-->
      <!--</div>-->

      <!--<div class="col-md-6 col-xs-12">-->
        <!--<chart-card :chart-data="activityChart.data" :chart-options="activityChart.options">-->
          <!--<h4 class="title" slot="title">2015 Sales</h4>-->
          <!--<span slot="subTitle"> All products including Taxes</span>-->
          <!--<span slot="footer">-->
            <!--<i class="ti-check"></i> Data information certified</span>-->
          <!--<div slot="legend">-->
            <!--<i class="fa fa-circle text-info"></i> Tesla Model S-->
            <!--<i class="fa fa-circle text-warning"></i> BMW 5 Series-->
          <!--</div>-->
        <!--</chart-card>-->
      <!--</div>-->

    </div>

  </div>
</template>
<script>
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import InfoCard from 'components/UIComponents/Cards/InfoCard.vue'
  export default {
    components: {
      ChartCard,
      InfoCard
    },
    mounted () {
      clearInterval(this.intervaloConsulta)
      this.intervaloConsulta = setInterval(function () { this.consultarServidor() }, 30000)
    },
    methods: {
      consultarServidor () {
        console.log()
      }
    },
    data () {
      return {
        intervaloConsulta: null,
        ultimaTemperatura: null,
        ultimaUmidade: null,
        ultimaAtuador: null,
        statusServidor: null,
        usersChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744],
              [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
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
        },
        activityChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
              [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        preferencesChart: {
          data: {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
          },
          options: {}
        }

      }
    }
  }

</script>
<style>

</style>
