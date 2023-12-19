<script setup lang="ts">
import ImageInteractionSection from '@/components/ImageInteractionSection.vue'
import HSLImageSection from '@/components/HSLImageSection.vue'
import CMYKImageSection from '@/components/CMYKImageSection.vue'
import type { CMYKPoint, FragmentBounds, HSLPoint, RGBPoint } from '@/types'
import HslHint  from '@/components/HslHint.vue'
import CmykHint  from '@/components/CmykHint.vue'
import { ref } from 'vue'

const firstTitle = ref('HSL')
const secondTitle = ref('CMYK')
const firstButtonText = ref('Upload image')
const cmykHintVisible = ref(false)
const hslHintVisible = ref(false)

const range = 30 as number

function canvasRgbImageToCMYK(canvas: HTMLCanvasElement | null) {
  if (canvas === null) {
    console.error('Canvas is null')
    return
  }
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

  if (!ctx) {
    console.error('Unable to get 2D context from canvas.')
    return
  }

  const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data: Uint8ClampedArray = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const rgbPoint: RGBPoint = { red: data[i], green: data[i + 1], blue: data[i + 2] }
    const cmykPoint: CMYKPoint = rgbToCmyk(rgbPoint)
    const afterRgbPoint = cmykToRgb(cmykPoint)
    data[i] = afterRgbPoint.red
    data[i + 1] = afterRgbPoint.green
    data[i + 2] = afterRgbPoint.blue
  }
  ctx.putImageData(imageData, 0, 0)
}

function canvasRgbImageToHSLWithColorSaturation(
  canvas: HTMLCanvasElement | null,
  colorHue: number | null,
  colorSaturation: number | null,
  fragmentBounds: FragmentBounds | null
) {
  if (canvas === null) {
    console.error('Canvas is null')
    return
  }
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

  if (!ctx) {
    console.error('Unable to get 2D context from canvas.')
    return
  }

  const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data: Uint8ClampedArray = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % canvas.width
    const y = Math.floor(i / (4 * canvas.width))

    if (
      fragmentBounds &&
      (x < fragmentBounds.startX ||
        x > fragmentBounds.endX ||
        y < fragmentBounds.startY ||
        y > fragmentBounds.endY)
    ) {
      continue
    }
    if (colorHue === null || colorSaturation === null) {
      continue
    }
    const rgbPoint: RGBPoint = { red: data[i], green: data[i + 1], blue: data[i + 2] }
    const hslPoint: HSLPoint = rgbToHsl(rgbPoint)
    let colourBoundRight = +colorHue + +range
    let colourBoundLeft = colorHue - range
    colourBoundLeft = colourBoundLeft < 0 ? 360 + colourBoundLeft : colourBoundLeft
    colourBoundRight = colourBoundRight > 360 ? colourBoundRight - 360 : colourBoundRight
    if (colorHue - range <= hslPoint.h && hslPoint.h <= +colorHue + +range) {
      hslPoint.s = colorSaturation
      const afterRgbPoint = HSLToRGB(hslPoint)
      data[i] = afterRgbPoint.red
      data[i + 1] = afterRgbPoint.green
      data[i + 2] = afterRgbPoint.blue
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

function rgbToHsl(rgb: RGBPoint): HSLPoint {
  rgb.red /= 255
  rgb.green /= 255
  rgb.blue /= 255
  const max: number = Math.max(rgb.red, rgb.green, rgb.blue)
  const min: number = Math.min(rgb.red, rgb.green, rgb.blue)

  let h, s, l

  if (max === min) {
    h = undefined
  } else if (max === rgb.red && rgb.green >= rgb.blue) {
    h = 60 * ((rgb.green - rgb.blue) / (max - min)) + 0
  } else if (max === rgb.red && rgb.green < rgb.blue) {
    h = 60 * ((rgb.green - rgb.blue) / (max - min)) + 360
  } else if (max === rgb.green) {
    h = 60 * ((rgb.blue - rgb.red) / (max - min)) + 120
  } else if (max === rgb.blue) {
    h = 60 * ((rgb.red - rgb.green) / (max - min)) + 240
  }

  l = 0.5 * (max + min)

  if (l === 0 || max === min) {
    s = 0
  } else if (0 < l && l <= 0.5) {
    s = (max - min) / (2 * l)
  } else if (l > 0.5) {
    s = (max - min) / (2 - 2 * l)
  }

  return { h, s, l } as HSLPoint
}

function HSLToRGB(hsl: HSLPoint): RGBPoint {
  const { h, s, l } = hsl

  function hueToRGB(p: number, q: number, t: number): number {
    t = (t + 1) % 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const H_k = (h !== undefined ? h / 360 : 0) % 1

  const Q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const P = 2 * l - Q

  const red = Math.round(hueToRGB(P, Q, H_k + 1 / 3) * 255)
  const green = Math.round(hueToRGB(P, Q, H_k) * 255)
  const blue = Math.round(hueToRGB(P, Q, H_k - 1 / 3) * 255)

  return { red, green, blue }
}

function rgbToCmyk(rgb: RGBPoint): CMYKPoint {
  const { red, green, blue } = rgb

  const black = Math.min(1 - red / 255, 1 - green / 255, 1 - blue / 255)
  const cyan = (1 - red / 255 - black) / (1 - black)
  const magenta = (1 - green / 255 - black) / (1 - black)
  const yellow = (1 - blue / 255 - black) / (1 - black)

  return {
    cyan: isNaN(cyan) ? 0 : Math.round(cyan * 100),
    magenta: isNaN(magenta) ? 0 : Math.round(magenta * 100),
    yellow: isNaN(yellow) ? 0 : Math.round(yellow * 100),
    black: Math.round(black * 100)
  }
}

function cmykToRgb(cmyk: CMYKPoint): RGBPoint {
  const { cyan, magenta, yellow, black } = cmyk

  const red = Math.round(255 * (1 - cyan / 100) * (1 - black / 100))
  const green = Math.round(255 * (1 - magenta / 100) * (1 - black / 100))
  const blue = Math.round(255 * (1 - yellow / 100) * (1 - black / 100))

  return {
    red: red > 255 ? 255 : red < 0 ? 0 : red,
    green: green > 255 ? 255 : green < 0 ? 0 : green,
    blue: blue > 255 ? 255 : blue < 0 ? 0 : blue
  }
}

function setHslHintVisible(newValue: boolean) {
  hslHintVisible.value = newValue
}

function setCmykHintVisible(newValue: boolean)  {
  cmykHintVisible.value = newValue
}
</script>

<template>
  <div class="with-margin">
    <HslHint v-if="hslHintVisible" 
  :setHintVisibility="setHslHintVisible"/>
  <div>
    <CmykHint v-if="cmykHintVisible"
    :setHintVisibility="setCmykHintVisible" />
    <div class="main-item">
      <div class="main-content-form">
        <div class="main-form-top-text">
          <h1>COLORS</h1>
          <a class>Experiment with the color pallete</a>
        </div>
        <div class="colors-content">
          <HSLImageSection
            :title="firstTitle"
            :canvasRedraw="canvasRgbImageToHSLWithColorSaturation"
            :loadButtonText="firstButtonText"
            :rgbToHsl="rgbToHsl"
          ></HSLImageSection>
          <ImageInteractionSection
          :setHslHintVisibility="setHslHintVisible"
          :setCmykHintVisibility="setCmykHintVisible"></ImageInteractionSection>
          <CMYKImageSection
            :title="secondTitle"
            :rgbToCmyk="rgbToCmyk"
            :canvasRedraw="canvasRgbImageToCMYK"
            :loadButtonText="firstButtonText"
          ></CMYKImageSection>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
/*__________set main form_________*/
.with-margin {
}
.main-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.main-content-form {
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  margin-right: 4rem;
  width: 100%;
  background-color: rgba(25, 165, 132, 0);
}

/*____________top text___________*/
.main-form-top-text {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.colors-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

.main-form-top-text a {
  margin-bottom: 0.375rem;
  margin-left: 1rem;
}
</style>
