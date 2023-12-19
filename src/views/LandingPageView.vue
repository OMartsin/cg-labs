<template>
        <div class="main-item">
            <div class="main-content-form">

                <div class="introduction-section">
                    <h1 class="introduction-title">Power<br> Your<br><span class="hilightr-word">Creativity</span></h1>
                    <a>This learning platform is all about computer graphics, like cool patterns (fractals),
                         shape changes (affine transformations), and color changes. You get to try them out
                          and there are quizzes to test what you've learned. Start exploring the world of
                           computer graphics with this project!</a>
                    <router-link to="/main"  class="start-button" id="upload-image-button">
                        Let`s go
                    </router-link>      
                </div>

                <div class="image-section">
                    <img src="../assets/landing-image.jpg" alt="landing-page-image">
                </div>
                    
            </div>
        </div>
</template>

<script setup lang="ts">

</script>

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
    justify-content: center;
    align-items: center; 
    width: 90%;
    height: 100%;
    background-color: rgba(59, 15, 47, 0);
}

/*________left informative section________*/
.introduction-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-between;
    align-items: left;
    width: 47%;
    height: 75%;
    background-color: rgba(190, 221, 175, 0);

}

.introduction-title{
    font-size: 4.25rem;
    line-height: 1.25;
}

.hilightr-word{
    color: #417885;
}

.start-button{
    text-decoration: none;
    text-align: center;
    width: 7rem;
    border-radius: 1rem;
    background-color: #ED7F1A;
    color: #F4F4F4;
    height: 2.25rem;
    padding: 0.5rem;
    margin-top: 1rem;
}

/*________right informative section________*/
.image-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 53%;
    height: 100%;
    background-color: rgba(80, 137, 10, 0);
}

</style>