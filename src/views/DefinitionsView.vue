<template>
<div class="main-item">
            <div class="main-content-form">

                <div class = "main-form-top-text">
                    <h1>DEFINITIONS</h1>
                    <a>Supplement your knowledge with new information</a>
                </div>
                <div class="whole-information-section">
                    <!-- fractals -->
                    <div class="first-whole-section">

                        <div class="definition-header"><h2>Fractals</h2></div>
                        <div class="first-section-content">
                            <div class="f-text-section">
                                <h4 class="custom-heading">Fractal (from Latin fractus - fragmented, fractional) - </h4>
                                <p class="custom-paragraph">In a broad sense, a structure composed of parts that are, in a certain sense, similar to the whole.</p><br>
                                <h4 class="custom-heading">Types of self-similarity in fractals:</h4>
                                <ul class="custom-list">
                                    <li><strong>Exact self-similarity:</strong> The strongest type of self-similarity. A fractal retains the same appearance at various magnifications.</li>
                                    <li><strong>Quasi self-similarity:</strong> A weaker form of self-similarity. A fractal appears approximately self-similar at various magnifications.</li>
                                    <li><strong>Statistical self-similarity:</strong> The weakest form of self-similarity. A fractal undergoes numerical or statistical changes that persist upon magnification.</li>
                                </ul>
                                <br>
                                <h4 class="custom-heading">Types of fractals:</h4>
                                <ul class="custom-list">
                                    <li><strong>Geometric (constructive) fractals:</strong> A class of fractals exhibiting self-similarity across different scales and possessing a geometric structure.</li>
                                    <li><strong>Algebraic (recurrent, dynamic) fractals:</strong> A class of fractals created using algebraic formulas and recurrent relationships. Their structure is determined by iterations of linear transformations.</li>
                                    <li><strong>Stochastic (random) fractals:</strong> A class of fractals where any parameters change during the construction through an iterative system of random numbers.</li>
                                    <li><strong>IFS (Iterated Function System) fractals:</strong> A class of fractals built through an iterated system of functions.</li>
                                </ul>
                            </div>
                            <div class="f-photo-section">
                                <img src="../assets/Sierpinski_triangle.png" class="photo">
                                <a>Picture 1. Serpinski triangle (Geometry fractal)</a>
                                <img src="../assets/Mandel_zoom_00_mandelbrot_set.jpg" class="photo">
                                <a>Picture 2. Mandelbrot set (Algebraic fractal)</a>
                                <img src="../assets/Infinite_Plasma_Fractal.webp" class="photo">
                                <a>Picture 3. Plasma (Stochastic fractal)</a>
                            </div>
                        </div>

                    </div>

                    <!-- colors -->
                    <div class="second-whole-section">
                        <div class="definition-header"><h2>Color Models</h2></div>
                        <div class="s-text-section">
                            <a><strong>Color Model</strong> - is a mathematical and visual way of representing and managing colors. There are several different color models, each used for specific purposes in graphics, design, photography, and other fields. The main color models include:</a><br><br>
                            <ul>
                                <li><strong>RGB (Red, Green, Blue):</strong> In this color model, each color is represented by a combination of three primary colors - red, green, and blue. Each color is defined by a numerical value ranging from 0 to 255 for each of these components.</li>
                        
                                <li><strong>CMYK (Cyan, Magenta, Yellow, Black):</strong> Widely used in the printing industry, colors are defined by percentage values of four primary components: cyan, magenta, yellow, and black.</li>
                        
                                <li><strong>HSV/HSB (Hue, Saturation, Value/Brightness):</strong> This model represents color using three parameters: hue (color) in degrees, saturation (intensity of color), and value/brightness.</li>
                        
                                <li><strong>HSL (Hue, Saturation, Lightness):</strong> Similar to HSV, but uses lightness instead of value/brightness to determine the color's brightness.</li>
                        
                                <li><strong>Lab (CIELAB):</strong> A model attempting to account for human perception of colors. It includes parameters "L" for lightness, "a" for the green-red spectrum, and "b" for the blue-yellow spectrum.</li>
                        
                                <li><strong>YUV:</strong> Widely used in video processing, where each pixel is represented by brightness (Y) and two color components (U and V).</li>
                        
                                <li><strong>Hexadecimal (HEX):</strong> This is a way of representing colors using hexadecimal code. Each color is represented by a combination of sixteen possible values for red, green, and blue.</li>
                            </ul>
                        </div>

                        <div class="s-photo-section">
                            <div class="s-picture-container">
                                <img src="../assets/rgb.png">
                                <a>RGB-model</a>
                            </div>
                            <div class="s-picture-container">
                                <img src="../assets/CMYK_Revised.png">
                                <a>CMYK-model</a>
                            </div>
                            <div class="s-picture-container">
                                <img src="../assets/hsv.png">
                                <a>HSV-model</a>
                            </div>
                            <div class="s-picture-container">
                                <img src="../assets/HSL_color_solid_cylinder.png">
                                <a>HSL-model</a>
                            </div>
                            <div class="s-picture-container">
                                <img src="../assets/lab.png">
                                <a>LAB-model</a>
                            </div>
                        </div>

                    </div>

                    <!-- affine transformation -->
                    <div class="third-whole-section">
                        <div class="definition-header"><h2>Affine transformation</h2></div>
                        <div class="t-content-section">
                            <video width="1200" height="700" controls>
                                <source src="../assets/Affine.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <a>Video from YouTube channel "Graphics in 5 Minutes"<br></a>
                            <a href="https://www.youtube.com/watch?v=AheaTd_l5Is&ab_channel=Graphicsin5Minutes">Link to channel</a>
                        </div>
                    </div>
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
    margin-bottom: 2rem;
    overflow: scroll;
}

.main-content-form{
    display: flex;
    flex-direction: column;
    width: 90%;
    background-color: rgba(54, 63, 70, 0);
}

/*____________top text___________*/
.main-form-top-text{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-end;
    margin-bottom: 1rem;
}

.main-form-top-text a{
    margin-bottom: 0.375rem;
    margin-left: 1rem;
}

/*--------------------------content -> definitions and photos section-----------------------*/


.whole-information-section {
    background-color: rgba(0, 255, 255, 0);
    overflow: scroll;
    height: 35rem;
}


/*_________________________first section_______________________*/
.first-whole-section{
    background-color: rgba(134, 213, 225, 0.305);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}

.definition-header{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.definition-header h2{
    color: #dd7513;
}

.first-section-content{
    display: flex;
    justify-content: center;
}

/*_________text section________*/
.f-text-section{
    width: 70%;
    background-color: rgba(127, 255, 212, 0);
}



/*оффнути рісет в деяких місцях*/

.text-section ul.custom-list {
    list-style: disc; 
    padding-left: 4rem; 
}


/*_______photo-section_______*/

.f-photo-section{
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.25rem;
    margin-left: 3.25rem;
    background-color: rgba(131, 139, 164, 0.177)
}

.photo{
    width: 68%;
}

.f-photo-section a{
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1rem;
}


/*_________________________second section_______________________*/
.second-whole-section{
    background-color: rgba(134, 213, 225, 0.305);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    margin-top: 2rem;
}

.s-photo-section{
    display: flex;
    justify-content: space-around;
    background-color: rgba(131, 139, 164, 0.177);
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 2rem;
}

.s-picture-container{
    width: 13rem;
    /* height: 12rem; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

/*_________________________third section_______________________*/
.third-whole-section{
    background-color: rgba(134, 213, 225, 0.305);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.t-content-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>