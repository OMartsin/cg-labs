<script setup lang="ts">
import router from '@/router';

function navigateTo(routeName: string) {
    router.push({ name: routeName });
}

</script>

<template>
<div class="main-item">
            <div class="main-content-form">

                <div @click="navigateTo('fractals')" class="option-div">
                    <a class="option-text">Creating fractals</a>
                    <div class="image-div"><img src="../assets/fractal-image-transformed.png"></div>
                    <router-link to="/fractals" class="start-option-button" id="upload-image-button">Start<i class="fa-solid fa-play"></i></router-link>      
                </div>
                <div @click="navigateTo('colors')" class="option-div">
                    <a class="option-text">Work with color schemes</a>
                    <div class="image-div"><img src="../assets/color-image-transformed.png"></div>
                    <router-link to="/colors" class="start-option-button" id="upload-image-button">Start<i class="fa-solid fa-play"></i></router-link>      
                </div>
                <div @click="navigateTo('geometry')" class="option-div">
                    <a class="option-text">Affine transformation of shapes</a>
                    <div class="image-div"><img src="../assets/afine-image-transformed.png"></div>
                    <router-link to="/geometry" class="start-option-button" id="upload-image-button">Start<i class="fa-solid fa-play"></i></router-link>      
                </div>

            </div>
        </div>
</template>

<style scoped>
.main-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88vh;
    background-color: #213a4200;
}

.main-content-form{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center; 
    width: 90%;
    height: 100%;
    background-color: rgba(59, 15, 47, 0);
}

/*________choose section_________*/
.option-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: #BCDEE4;
    width: 30%;
    height: 70%;
    border-radius: 1rem;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    padding: 3%;
}

.option-div:hover{
    background-color: #B8CCCF;
}
.image-div{
    width: 65%;
    height: 55%;
}

.start-option-button{
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    border-radius: 1rem;
    background-color: #ED7F1A;
    color: #F4F4F4;
    height: 2.25rem;
    margin-top: 1rem;
    padding-left: 10%;
    padding-right: 5%;
}

.option-text{
    font-size: 1.75rem;
    line-height: 1.25;
    font-weight: 500;
    text-align: center;
}


</style>