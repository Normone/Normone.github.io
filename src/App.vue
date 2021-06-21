<template>
<div class="kva">
  <div class='container'>
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
      <p>Настроение: {{stats.mood}}</p>
      <p>Возбуждение: {{stats.arousal}}</p>
      <p>Выносливость: {{stats.endurance}} (max: {{maxEndurance}})</p>
    </div>
    <div class="control">
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="wakeUp">Wake up</button>
      <img class="controlIcon" src="./assets/icon/night-sleep.svg" alt="">
      <button v-on:click="sleep">Sleep</button>
      
    </div>
    <div class="debag">
      <img class="controlIcon" src="./assets/icon/pie-slice.svg" alt="">
      <button v-on:click="feed">feed</button>
      <img class="controlIcon" src="./assets/icon/glass-shot.svg" alt="">
      <button v-on:click="getDrunk">Get drunk</button>
      <img class="controlIcon" src="./assets/icon/game-console.svg" alt="">
      <button v-on:click="entertain">Entertain</button>
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="freezing">Freezing</button>
      <img class="controlIcon" src="./assets/icon/alarm-clock.svg" alt="">
      <button v-on:click="checkDead">dead?</button>
    </div>
  </div>
  <div class="game-clicker">
    <img class="controlIcon" src="./assets/icon/money-stack.svg" alt="">
    <p class="moneyCount">$: {{click}}</p>
    <div style="position: relative">
      <div v-on:click="clicks" id="btn" >$</div>
    </div>
    
    
    <div class="shop">
      <h1>Shop</h1>
      <div kva="10$" v-on:click="buyFood" class="controlIcon">
        <img src="./assets/icon/pie-slice.svg" alt="Купить еды (10)">
        <p>Еда</p>
      </div>
      <div kva="10$" v-on:click="buyWater" class="controlIcon">
        <img src="./assets/icon/glass-shot.svg" alt="Купить воды (10)">
        <p>Вода</p>
      </div>
      <div kva="10$" v-on:click="buyGames" class="controlIcon">
        <img src="./assets/icon/game-console.svg" alt="Купить игру (10)">
        <p>Игры</p>
      </div>
      <div kva="10$" v-on:click="buyEnergyDrink" class="controlIcon">
        <img src="./assets/icon/game-console.svg" alt="Купить энергетик (10)">
        <p>Энергетик</p>
      </div>
    </div>
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
        mood: 6,
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




    clicks: function(e) {
      this.click++

      let x = this.click;

      const btn = document.getElementById("btn");

      const popUp = document.createElement("div");
      popUp.setAttribute("class", "popUp");
      popUp.setAttribute("id", '"popUp'+ x +'"');
      popUp.innerHTML = "+1";
      btn.append(popUp);

      // console.log(e)
      const ex = document.getElementById('"popUp'+ x +'"');

      ex.style.top = e.clientY + 'px';
      ex.style.left = e.clientX - 10 + 'px';

      setTimeout(() => ex.remove(), 1000);
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
      this.stats.mood +=3;
      if (this.stats.mood > 12) {
        this.stats.mood = 12
      }
    },
    getEndurance: function() {
      this.stats.endurance += 3;
      if (this.stats.endurance > this.maxEndurance) {
        this.stats.endurance = this.maxEndurance
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
    },
    buyFood: function() {
      if (this.click >= 10) {
        this.click = this.click - 10;
        this.feed();
      }
    },
    buyWater: function() {
      if (this.click >= 10) {
        this.click = this.click - 10;
        this.getDrunk();
      }
    },
    buyGames: function() {
      if (this.click >= 10) {
        this.click = this.click - 10;
        this.entertain();
      }
    },
    buyEnergyDrink: function() {
      if (this.click >= 10) {
        this.click = this.click - 10;
        this.getEndurance();
      }
    },
  },
  



  computed: {
    maxEndurance: function() {
      return (this.stats.bellyful + this.stats.hydration) / 2;
    },
  },
  
};

</script>


















<style>
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

* {
  transform: none;
  z-index: 1;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}

body {
  background-color: #fdfdfd;
}
.container {
    display: flex;
    width: 700px;
    height: 500px;
    margin: 0 auto;
    
    /* border: 1px solid black; */
    /* border-radius: 10%; */
    flex-direction: column;
    align-items: center;
    /* background: no-repeat url(/img/fckngBG.dbb4d7c7.png); */
    background-size: contain;
    background-color: #ffffff;
    background-position: 50%;
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
#btn {
    display: block;
    width: 80px;
    height: 80px;
    margin: 10px auto;
    text-align: center;
    padding: 30px;;
    background-color: rgb(192, 174, 174);
    border-radius: 50%;
}
.popUp {
  position: fixed;
  /* top: 15px;
  left: 135px; */
  width: 25px;
  height: 25px;
  color: rgb(255, 0, 0);
  font-weight: bold;
  animation: GoUp 1s forwards linear;
  /* transition: transform 5s; */
}

@keyframes GoUp {
    0% {
        opacity: 1;
    }
    100% {
        top: -10px;
        opacity: 0;
    }
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
  display: inline-block;
  position: relative;
  margin: 10px;
}
.controlIcon p {
  text-align: center;
  font-size: 14px;
}
.controlIcon:hover::after {
  content: attr(kva);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.6);
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 11px;
  padding: 2px 0px;
  border: 1px solid #333;
 }

.debag {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 5px;
  left: 5px;
}

.game-clicker {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  align-items: center;
  background-color: #f7f7f7;
}
.moneyCount {
  width: 75%;
}
.shop {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  background-color: #efefef;
  justify-content: space-around;
}
.shop h1 {
  border-bottom: 1px solid black;
  width: 100%;
}
</style>