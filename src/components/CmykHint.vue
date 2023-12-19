<script setup lang="ts">
const { setHintVisibility } = defineProps<{ setHintVisibility: (newVal: boolean) => void }>()
</script>

<template>
  <div class="modal-overlay">
    <div class="main-item">
      <div class="main-content-form">
        <div class="inform-window">
          <div class="inform-window-head">
            <button class="close-button" @click="setHintVisibility(false)">
              <i class="fa-regular fa-circle-xmark cancle-icon"></i>
            </button>
          </div>
          <div class="inform-window-content">
            <h2>What is CMYK?</h2>
            <div class="info-section">
              <div class="info-text-section">
                <a>
                  <strong>(Cyan, Magenta, Yellow, Key/Black)</strong> - is a subtractive color model
                  used in printing to create a full spectrum of colors. The letters in the name
                  represent the four primary colors: Cyan (blue), Magenta (purple), Yellow, and
                  Key/Black. These colors are combined to achieve various shades. For example, red
                  is produced by using Magenta and Yellow without Cyan. The addition of Black (Key)
                  enhances contrast and depth of colors.
                </a>
              </div>
              <div class="info-image-section">
                <img src="../assets/CMYK_Revised.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 27, 27, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.main-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #213a4200;
}

.main-content-form{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    width: 100%;
    height: 100%;
    background-color: rgba(27, 27, 27, 0.6);
}

/*__________________________Module Window CSS________________________*/


.inform-window{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 63%;
    background-color: rgba(211, 213, 201, 1);
    border-radius: 1rem;
    border: 0.125rem solid rgba(44, 36, 36, 0.381);
    padding-left: 2rem;
    padding-bottom: 2rem;
}

.inform-window-head{
    display: flex;
    justify-content: right;
    width: 100%;
    height: 10%;
    background-color: #307c5300;
   
}

.close-button{
    background: none;
    width: 3rem;
    margin-top: 0.75rem;
    margin-right: 0.75rem;
}

.cancle-icon{
    font-size: 2rem;
}

.inform-window-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
    background-color: #82d2b500;
}

.info-section{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.info-image-section{
    margin-top: 4rem;
    width: 40%;
    height: 110%;
    margin-right: 1rem;
}

.info-text-section{
    margin-top: 2rem;
    width: 60%;
    height: 100%;
}
</style>
