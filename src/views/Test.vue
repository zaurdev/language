<template>
    <div>
        <div class="test-container">
            <ul class="word-list">
                <li v-for="(el, index) in getTest.arrValues" :key="index" :class="{'active': first == el.id}">
                    <a 
                        href="#"  
                        @click.prevent="setFirst(el, index)" 
                        :ref="`first-item-${el.id}`"
                        >
                        {{ el.equal }}
                    </a>
                </li>
            </ul>
            <ul class="word-list">
                <li v-for="(el, index) in getTest.arrKeys" :key="index" :class="{'active': second == el.id}">
                    <a 
                        href="#" 
                        @click.prevent="setSecond(el, index)" 
                        :ref="`second-item-${el.id}`"
                        >
                        {{ el.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <button class="btn btn-primary mr-2 py-2 px-4"> <i class="fas fa-refresh mr-1"></i> Sıfırla</button>
            <button class="btn btn-primary ml-2"> <i class="fas fa-add mr-1"></i> Yeni tur</button>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            randomElements:{
                type: Array,
                default: [],
            },
            itemForAdd: {
                type: Array
            },
        },
        data(){
            return {
                first: null,
                second: null,
                disabled: []
            }
        },
        methods:{
            checkCorrect(){
                if(this.second != null && this.first != null){
                    if(this.second == this.first){
                        let data = this.randomElements.find((b) => b.id == this.first);
                        data.done=true;
                        this.$emit('updateSuccess', data);
                    }
                    this.second = null;
                    this.first = null;
                }
            },
            reload(){
                window.location.reload();
            },
            shuffleArray(array) {
                let shuffled =array.slice(0), i =array.length, temp, index;
                while (i-- > 0) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
                return shuffled;
            },
            setSecond(el, index){
                if(this.first){
                    this.second = el.id;
                    if(this.first == this.second){
                        let secondEl = this.$refs['second-item-'+this.second];
                        secondEl[0].classList.add('correct');
                        secondEl[0].classList.remove('active');
                        let firstEl = this.$refs['first-item-'+this.first];
                        firstEl[0].classList.add('correct');
                        firstEl[0].classList.remove('active');
                        this.checkCorrect();
                        setTimeout(() => {
                            secondEl[0].classList.remove('correct');
                            secondEl[0].classList.remove('active');
                            firstEl[0].classList.remove('correct');
                            firstEl[0].classList.remove('active');
                            firstEl[0].classList.add('disabled');
                            secondEl[0].classList.add('disabled');
                        }, 300);
                    }else{
                        let secondEl = this.$refs['second-item-'+this.second];
                        secondEl[0].classList.add('wrong');
                        secondEl[0].classList.remove('active');
                        let firstEl = this.$refs['first-item-'+this.first];
                        firstEl[0].classList.add('wrong');
                        firstEl[0].classList.remove('active');
                        this.checkCorrect();
                        setTimeout(() => {
                            secondEl[0].classList.remove('wrong');
                            secondEl[0].classList.remove('active');
                            firstEl[0].classList.remove('wrong');
                            firstEl[0].classList.remove('active');
                        }, 300);
                    }
                }
            },
            setFirst(el, index){
                let firstEl = this.$refs['first-item-'+el.id];
                if(firstEl[0].classList.length == 0 || !firstEl[0].classList.contains('disabled')){
                    this.first = el.id;
                    firstEl[0].classList.add('active');
                }
            },
        },
        computed:{
            getTest(){
                let arrKeys = [];
                let arrValues = [];
                for(let i=0;i<this.randomElements.length;i++){
                    arrKeys.push(this.randomElements[i]);
                    arrValues.push(this.randomElements[i]);
                }
                if(arrKeys.length > 0 && arrValues.length > 0){
                    return {
                        arrKeys: this.shuffleArray(arrKeys),
                        arrValues: this.shuffleArray(arrValues)
                    }
                }
                return {
                    arrKeys: [],
                    arrValues: []
                }
            }
        }
    }
</script>

<style>
    .test-container{
        display: flex;
    }
    .test-container .word-list:nth-child(1){
        padding-right: 10px;
    }
    .test-container .word-list:nth-child(2){
        padding-left: 10px;
    }
    .test-container ul{
        min-width: 50%;
        list-style: none;
        padding: 0;
    }
    .word-list{
        padding: 0px;
        margin: 0px;
    }
    .word-list li a{
        padding: 10px 20px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 5px;
        margin-bottom: 10px;
        text-align: center;
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        text-decoration: none;
        color: rgba(0,0,0,0.8);
    }
    .word-list li a.active{
        border: 1px solid rgba(0,0,0,0.1);
        background-color: #e1eefa;
        border-color: #318CE7;
    }
    .word-list li a.wrong{
        border: 1px solid red;
        background-color: rgba(255, 177, 177, 0.815);
    }
    .word-list li a.correct{
        border: 1px solid rgb(31, 235, 31);
        background-color: rgba(192, 255, 192, 0.815);
    }
    .word-list li a.disabled{
        background-color: #f9f6f6;
        border: 1px solid #e0e1e2;
        color: #caced2;
    }
</style>