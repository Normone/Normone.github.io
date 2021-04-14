<template>
    <ul>
        <li class="arrItem" v-for="item in arr" :key="item.id">
            <info class="arrItem__info">
                <iframe width="300px" :src="item.src"></iframe>
                <div>
                    <h1 class="arrItem__info_titleVideo">{{item.titleVideo}}</h1>
                    <p class="arrItem__info__container_KremlinbotsCount">Количество ботов: {{item.kremlinsCount}}</p>
                </div>
                <button v-on:click="show">Показать больше</button>
            </info>
            <div v-if="kvak">
                <div class="comments"  v-for="itemComments in item.bots" :key="itemComments.id">
                    <div class="commentItem">
                        <a :src="itemComments.src">ссылка</a>
                    <p>{{itemComments.nickname}}</p>
                    </div>
                </div>
            </div>
            
        </li>
    </ul>
</template>


<script>

export default {
    data() {
        return {
            arr: [{
                src: 'https://www.youtube.com/watch?v=eCjSQvmuOaI&ab_channel=WhyMe758',
                titleVideo: 'kva',
                kremlinsCount: 10,
                bots: [{
                    src: 'sdfs',
                    nickname: 'Я тупой бот'
                },
                ],
            },{
                src: 'ava',
                titleVideo: 'ava',
                kremlinsCount: 15,
                bots: [{
                    src: 'kurva',
                    nickname: 'Я очень тупой бот'
                },
                ],
            },
            ],
            kvak: false,
        }
        
    },
    methods: {
        show: function() {
            this.kvak = true
        }
    }
}

</script>
<style scoped>
.arrItem {
    
}
.arrItem iframe {
    background-color: #fff;
    margin: 3px;
}
.arrItem__info {
    display: flex;
    background-color: rgb(146, 146, 146);
    margin: 5px;
    justify-content: space-between;
}
.arrItem__info_titleVideo {
    
}
.arrItem__info__container_KremlinbotsCount {

}
.comments {

}
</style>