<template>
<div class="kva">
  <div class='container' v-bind:class="{loginned: isLoginned, notLoginned : !isLoginned}">
    <h1 id="title">{{name}}</h1>
    <img :src="require('@/assets/' + currentStatus + '.png')">
    <div  class="imgCard">{{img}}</div>
    <div class="description">
        <p>{{name}} {{description}}</p>
    </div>
  </div>
  <div class="game">
    <div class="stats">
      <p>Сытость: {{stats.bellyful}}</p>
      <p>Гидрация: {{stats.hydration}}</p>
      <p>Чистота: {{stats.clean}}</p>
      <p>Развлечённость: {{stats.entertainment}}</p>
      <p>Возбуждение: {{stats.arousal}}</p>
      <p>Выносливость: {{stats.endurance}} (max: {{maxEndurance}})</p>
    </div>
    <div class="control">
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="wakeUp">Wake up</button>
      <img class="controlIcon" src="./assets/icon/night-sleep.svg" alt="">
      <button v-on:click="sleep">Sleep</button>
      <img class="controlIcon" src="./assets/icon/pie-slice.svg" alt="">
      <button v-on:click="feed">feed</button>
      <img class="controlIcon" src="./assets/icon/glass-shot.svg" alt="">
      <button v-on:click="getDrunk">Get drunk</button>
      <img class="controlIcon" src="./assets/icon/game-console.svg" alt="">
      <button v-on:click="entertain">entertain</button>
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="freezing">Freezing</button>
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="checkDead">dead?</button>
    </div>
  </div>
  <div class="game-clicker">
    <img class="controlIcon" src="./assets/icon/money-stack.svg" alt="">
    <p>$: {{click}}</p>
    <button v-on:click="clicks" class="btn">$</button>
    <div class="shop"></div>
    
  </div>
</div>
</template>














<script>

// import vl from './components/videoList.vue';

export default {
  name: 'App',

  components: {
    // videoList: vl,
  },

  data() {
    return {
      name: 'Крокодил',
      img: '1',
      description: 'ебёт гусей',
      isNotLoginned: true,
      isLoginned: false,
      intervalA: null,
      intervalB: null,
      stats: {
        bellyful: 6,
        hydration: 6,
        clean: 6,
        entertainment: 6,
        arousal: 0,
        endurance: 1,
      },
      click: 0,
      currentStatus: 'sleep',
      


    }
  },
  methods: {
    wakeUp: function() {
      if (this.intervalA === null) {
        clearInterval(this.intervalB);
        
        this.intervalA = setInterval(() => {
          for (let key in this.stats) {
            if (this.stats[key] > 0 && key !== 'arousal'  && key !== 'endurance') {
              this.stats[key] = this.stats[key] - 1;
            } else if (key == 'arousal' && this.stats[key] !== 12) {
              this.stats[key] = this.stats[key] + 1;
            } else if (key == 'endurance') {
              this.stats[key] = this.stats[key] + 1;
              if (this.stats[key] > this.maxEndurance) {
                this.stats[key] = this.maxEndurance;
              }
            }
            if (this.stats[key] < 0) {
                this.stats[key] = 0
            }
            
          }
          this.changeImg()
          this.checkDead()
          this.getStatus()
          
        }, 6000); //30 минут = 1800000 или 30*60*1000

        this.intervalB = null;
      }
    },
    sleep: function() {
      this.currentStatus = 'sleep';
      if (this.intervalB == null) {
        clearInterval(this.intervalA);
        this.intervalB = setInterval(() => {
          for (let key in this.stats) {
            if (this.stats[key] > 0 && key !== 'arousal' && key !== 'endurance') {
              this.stats[key] = this.stats[key] - 0.5;
            } else if (key == 'arousal' && this.stats[key] !== 0) {
              this.stats[key] = this.stats[key] - 1;
            } else if (key == 'endurance') {
              this.stats[key] = this.stats[key] + 2;
              if (this.stats[key] > this.maxEndurance) {
                this.stats[key] = this.maxEndurance;
              }
            }
            if (this.stats[key] < 0) {
                this.stats[key] = 0
            }
          }
          this.changeImg()
          this.checkDead()
        }, 6000); //30 минут = 1800000 или 30*60*1000
        this.intervalA = null;
      }
    },
    clicks: function() {
      this.click += 1;
    },
    changeImg: function() {
      if (this.stats.arousal === 12) {
        this.isLoginned = true;
        this.isNotLoginned = false;
      } else {
        this.isLoggined = false;
        this.isNotLoginned = true;
      }
    },
    feed: function() {
      this.stats.bellyful += 3;
      if (this.stats.bellyful > 12) {
        this.stats.bellyful = 12
      }
    },
    getDrunk: function() {
      this.stats.hydration += 3;
      if (this.stats.hydration > 12) {
        this.stats.hydration = 12
      }
    },
    entertain: function() {
      this.stats.entertainment +=3;
      if (this.stats.entertainment > 12) {
        this.stats.entertainment = 12
      }
    },
    freezing: function() {
      clearInterval(this.intervalB);
      clearInterval(this.intervalA);
      this.intervalA = null;
      this.intervalB = null;
    },
    checkDead: function() {
      if (this.stats.bellyful == 0 && this.stats.hydration == 0) {
        alert("She's dead")
        this.freezing()
      }
    },
    getStatus: function() {
      if (this.stats.bellyful && this.stats.hydration >0) {
       if (this.stats.endurance >0) {
        if (this.stats.arousal >0 && this.stats.arousal <= 4) {
          this.currentStatus = 'calm'
        } else if (this.stats.arousal > 4 && this.stats.arousal <= 7) {
          this.currentStatus = 'weakArousal'
        } else if (this.stats.arousal > 7 && this.stats.arousal <= 11) {
          this.currentStatus = 'arousal'
        } else if (this.stats.arousal > 11 && this.stats.arousal <= 12) {
          this.currentStatus = 'broken'
        }
      }
     }
    }
  },
  



  computed: {
    maxEndurance: function() {
      return (this.stats.bellyful + this.stats.hydration) / 2;
    },
  },
  
};

</script>


















<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

* {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    word-wrap: break-word;
}
button {
  background-color: #fff;
  display: block;
  width: 100px;
  height: 20px;
  margin: 1px;
  border: 1px solid;
}

/* #app {
    background: no-repeat url(img/bg-login-0.jpeg);
    width: 100%;
    background-size: contain;
    background-position: 50%;
} */

.container {
    display: flex;
    width: 400px;
    height: 500px;
    margin: 0 auto;
    margin-top: 50px;
    border: 1px solid black;
    border-radius: 5%;
    flex-direction: column;
    align-items: center;
}
.container img {
  width: 250px;
}
#title {
    padding: 4px 10px;
    text-align: center;
}
.imgCard {
    
}
.description {
    padding: 5px;
}
.form {
    margin: 10px auto;
    width: 400px;
    height: 67px;
}
.form input {
    display: flex;
    margin: 5px auto;
    background-color: rgba(255, 255, 255, 0.5);
}
.btn {
    display: block;
    width: 100px;
    height: 20px;
    margin: 10px auto;
}
.loginned {
    background: no-repeat url(./assets/bg-login-1.jpeg);
    background-size: contain;
    background-position: 50%;
}
.notLoginned {
    background: no-repeat url(./assets/bg-login-0.jpeg);
    background-size: contain;
    background-position: 50%;
}


.game {
  position: absolute;
  left: 0px;
  top: 10%;
  width: 300px;
}
.stats {
  width: 200px;
  border: 1px solid black;
  width: 240px;
}
.control {
width: 200px;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
}
.controlIcon {
  width: 50px;
  height: 50px;

}

.game-clicker {
  position: absolute;
  right: 0px;
  top: 10%;
  width: 300px;
}
</style>