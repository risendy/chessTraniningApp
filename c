[1mdiff --git a/app/Resources/views/base.html.twig b/app/Resources/views/base.html.twig[m
[1mindex 3c94bb7..55fac45 100644[m
[1m--- a/app/Resources/views/base.html.twig[m
[1m+++ b/app/Resources/views/base.html.twig[m
[36m@@ -14,11 +14,6 @@[m
     {% endblock %}[m
 [m
     <title>{% block title %}Chess training application!{% endblock %}</title>[m
[31m-[m
[31m-    <!-- Latest compiled and minified CSS -->[m
[31m-    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"[m
[31m-          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">[m
[31m-[m
     <!-- Latest compiled and minified JavaScript -->[m
 [m
     <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->[m
[1mdiff --git a/assets/js/app.js b/assets/js/app.js[m
[1mindex cd4a071..87fb0c3 100644[m
[1m--- a/assets/js/app.js[m
[1m+++ b/assets/js/app.js[m
[36m@@ -1,4 +1,5 @@[m
 import 'bootstrap/dist/css/bootstrap.css';[m
[32m+[m[32mimport '@fortawesome/fontawesome-free/css/all.css';[m
 [m
 require('../css/custom.css');[m
 require('../css/chessboard-0.3.0.css');[m
[1mdiff --git a/assets/js/components/ChartContainerMini.vue b/assets/js/components/ChartContainerMini.vue[m
[1mindex 9477078..d290e98 100644[m
[1m--- a/assets/js/components/ChartContainerMini.vue[m
[1m+++ b/assets/js/components/ChartContainerMini.vue[m
[36m@@ -1,90 +1,89 @@[m
 <template>[m
[31m-  <center>[m
[31m-  <div class="container">[m
[31m-    <line-chart[m
[31m-      v-if="loaded"[m
[31m-      :chartdata="chartdata"[m
[31m-      :options="options"/>[m
[31m-  </div>[m
[31m-  </center>[m
[32m+[m[32m    <center>[m
[32m+[m[32m        <div class="container">[m
[32m+[m[32m            <line-chart[m
[32m+[m[32m                    v-if="loaded"[m
[32m+[m[32m                    :chartdata="chartdata"[m
[32m+[m[32m                    :options="options"/>[m
[32m+[m[32m        </div>[m
[32m+[m[32m    </center>[m
 </template>[m
 [m
 <script>[m
[31m-import LineChart from './Chart.vue'[m
[31m-import "babel-core/register";[m
[31m-import "babel-polyfill";[m
[32m+[m[32m    import LineChart from './Chart.vue'[m
[32m+[m[32m    import "babel-core/register";[m
[32m+[m[32m    import "babel-polyfill";[m
 [m
[31m-var fetchNewData = async function () {[m
[31m-  var userRankingHistory = await fetch(Routing.generate('api_get_user_history_ranking', {id: 3} ));[m
[31m-  var historyJson = await userRankingHistory.json();[m
[32m+[m[32m    var fetchNewData = async function () {[m
[32m+[m[32m        var userRankingHistory = await fetch(Routing.generate('api_get_user_history_ranking', {id: 3} ));[m
[32m+[m[32m        var historyJson = await userRankingHistory.json();[m
 [m
[31m-  return historyJson;[m
[31m-};[m
[32m+[m[32m        return historyJson;[m
[32m+[m[32m    };[m
 [m
[31m-var prepareNewChartData = function(newData) {[m
[31m-  return {[m
[31m-    labels: newData.label,[m
[31m-    legend: {[m
[31m-      display: false[m
[31m-    },[m
[31m-    datasets: [[m
[31m-      {[m
[31m-        label: 'User ranking',[m
[31m-        backgroundColor: '#f87979',[m
[31m-        data: newData.data,[m
[31m-      }[m
[31m-    ][m
[31m-  };[m
[31m-};[m
[32m+[m[32m    var prepareNewChartData = function(newData) {[m
[32m+[m[32m        return {[m
[32m+[m[32m            labels: newData.label,[m
[32m+[m[32m            legend: {[m
[32m+[m[32m                display: false[m
[32m+[m[32m            },[m
[32m+[m[32m            datasets: [[m
[32m+[m[32m                {[m
[32m+[m[32m                    label: 'User ranking',[m
[32m+[m[32m                    backgroundColor: '#f87979',[m
[32m+[m[32m                    data: newData.data,[m
[32m+[m[32m                }[m
[32m+[m[32m            ][m
[32m+[m[32m        };[m
[32m+[m[32m    };[m
 [m
[31m-export default {[m
[31m-  name: "LineChartContainerMini",[m
[31m-  components: { [m
[31m-     LineChart [m
[31m-  },[m
[31m-  data: () => ({[m
[31m-    test:1,[m
[31m-    loaded: false,[m
[31m-    chartdata: {[m
[31m-      type: Object,[m
[31m-      default: null[m
[31m-    },[m
[31m-    options: {[m
[31m-      type: Object,[m
[31m-      maintainAspectRatio: false,[m
[31m-      responsive: true,[m
[31m-      default: null,[m
[31m-      legend: {[m
[31m-        display:false[m
[31m-      },[m
[31m-      scales:{[m
[31m-        xAxes: [{[m
[31m-          display: false //this will remove all the x-axis grid lines[m
[31m-        }][m
[31m-      }[m
[32m+[m[32m    export default {[m
[32m+[m[32m        name: "LineChartContainerMini",[m
[32m+[m[32m        components: {[m
[32m+[m[32m            LineChart[m
[32m+[m[32m        },[m
[32m+[m[32m        data: () => ({[m
[32m+[m[32m            loaded: false,[m
[32m+[m[32m            chartdata: {[m
[32m+[m[32m                type: Object,[m
[32m+[m[32m                default: null[m
[32m+[m[32m            },[m
[32m+[m[32m            options: {[m
[32m+[m[32m                type: Object,[m
[32m+[m[32m                maintainAspectRatio: false,[m
[32m+[m[32m                responsive: true,[m
[32m+[m[32m                default: null,[m
[32m+[m[32m                legend: {[m
[32m+[m[32m                    display:false[m
[32m+[m[32m                },[m
[32m+[m[32m                scales:{[m
[32m+[m[32m                    xAxes: [{[m
[32m+[m[32m                        display: false //this will remove all the x-axis grid lines[m
[32m+[m[32m                    }][m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[32m        }),[m
[32m+[m[32m        methods: {[m
[32m+[m[32m            async forceRerender() {[m
[32m+[m[32m                this.loaded = false;[m
[32m+[m[32m                try {[m
[32m+[m[32m                    var newData = await fetchNewData();[m
[32m+[m[32m                    this.chartdata = prepareNewChartData(newData);[m
[32m+[m[32m                    this.loaded = true[m
[32m+[m[32m                } catch (e) {[m
[32m+[m[32m                    console.error(e)[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[32m        },[m
[32m+[m[32m        async mounted () {[m
[32m+[m[32m            this.loaded = false;[m
[32m+[m[32m            try {[m
[32m+[m[32m                var newData = await fetchNewData();[m
[32m+[m[32m                this.chartdata = prepareNewChartData(newData);[m
[32m+[m[32m                this.loaded = true[m
[32m+[m[32m            } catch (e) {[m
[32m+[m[32m                console.error(e)[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
     }[m
[31m-  }),[m
[31m-  methods: {[m
[31m-    async forceRerender() {[m
[31m-      this.loaded = false[m
[31m-      try {[m
[31m-        var newData = await fetchNewData();[m
[31m-        this.chartdata = prepareNewChartData(newData);[m
[31m-        this.loaded = true[m
[31m-      } catch (e) {[m
[31m-        console.error(e)[m
[31m-      }[m
[31m-    }[m
[31m-  },[m
[31m-  async mounted () {[m
[31m-    this.loaded = false[m
[31m-    try {[m
[31m-      var newData = await fetchNewData();[m
[31m-      this.chartdata = prepareNewChartData(newData);[m
[31m-      this.loaded = true[m
[31m-    } catch (e) {[m
[31m-      console.error(e)[m
[31m-    }[m
[31m-  }[m
[31m-}[m
 </script>[m
\ No newline at end of file[m
[1mdiff --git a/assets/js/components/nextPosition.vue b/assets/js/components/nextPosition.vue[m
[1mindex 85d6ba7..86051f4 100644[m
[1m--- a/assets/js/components/nextPosition.vue[m
[1m+++ b/assets/js/components/nextPosition.vue[m
[36m@@ -3,9 +3,9 @@[m
 </template>[m
 [m
 <script>[m
[31m-export default {[m
[32m+[m[32mexport default{[m
   data: () => ({[m
[31m-    name: "Kuba"[m
[32m+[m
   })[m
 }[m
 [m
[1mdiff --git a/package.json b/package.json[m
[1mindex 6cba6e2..bb7abea 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -7,6 +7,7 @@[m
     "vue-template-compiler": "^2.6.10"[m
   },[m
   "dependencies": {[m
[32m+[m[32m    "@fortawesome/fontawesome-free": "^5.9.0",[m
     "axios": "^0.19.0",[m
     "babel-core": "^6.0.20",[m
     "babel-plugin-transform-runtime": "^6.23.0",[m
[1mdiff --git a/yarn.lock b/yarn.lock[m
[1mindex 70fd196..a8b4dfd 100644[m
[1m--- a/yarn.lock[m
[1m+++ b/yarn.lock[m
[36m@@ -625,6 +625,11 @@[m
     lodash "^4.17.11"[m
     to-fast-properties "^2.0.0"[m
 [m
[32m+[m[32m"@fortawesome/fontawesome-free@^5.9.0":[m
[32m+[m[32m  version "5.9.0"[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-free/-/fontawesome-free-5.9.0.tgz#1aa5c59efb1b8c6eb6277d1e3e8c8f31998b8c8e"[m
[32m+[m[32m  integrity sha512-g795BBEzM/Hq2SYNPm/NQTIp3IWd4eXSH0ds87Na2jnrAUFX3wkyZAI4Gwj9DOaWMuz2/01i8oWI7P7T/XLkhg==[m
[32m+[m
 "@nuxt/opencollective@^0.2.2":[m
   version "0.2.2"[m
   resolved "https://registry.yarnpkg.com/@nuxt/opencollective/-/opencollective-0.2.2.tgz#17adc7d380457379cd14cbb64a435ea196cc4a6e"[m
