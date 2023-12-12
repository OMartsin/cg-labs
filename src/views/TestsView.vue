<script setup lang="ts">
import { ref } from 'vue'
import questions from '../questions.json'
import { shuffle } from '@/shuffle';

interface Option {
  label: string
  value: string
}

interface Question {
  title: string
  options: Option[]
  correctAnswers: string[]
}

const selectedAnswers = ref<string[][]>([])
questions.forEach(() => selectedAnswers.value.push([]))
const answerResults = ref<{ questionIndex: number; isCorrect: boolean }[]>([])
const showResults = ref(false)

const getRandomQuestions = (count: number) => {
  const shuffledQuestions = shuffle(questions);
  return shuffledQuestions.slice(0, count);
};

const selectedQuestions = ref<Question[]>(getRandomQuestions(10));

const checkAnswers = () => {
  answerResults.value = [] // Clear previous results
  questions.forEach((question, index) => {
    const selectedOptions = selectedAnswers.value[index]
      .map((isSelected, optionIndex) => isSelected ? question.options[optionIndex].value : null)
      .filter(value => value !== null);
    selectedAnswers.value[index] = selectedOptions as string[];
    const isCorrect = arraysEqual(selectedOptions, question.correctAnswers ?? []);
    answerResults.value.push({ questionIndex: index, isCorrect })
  })
  showResults.value = true
}

const restartTest = () => {
  selectedAnswers.value = []
  questions.forEach(() => selectedAnswers.value.push([]))
  selectedQuestions.value = (getRandomQuestions(10));
  answerResults.value = []
  showResults.value = false
}

const countCorrectAnswers = () => {
  return answerResults.value.filter(result => result.isCorrect).length
}

const arraysEqual = (arr1: string[], arr2: string[]) => {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
}
</script>

<template>
  <div class="main-item">
    <div class="main-content-form">
      <div class="main-form-top-text">
        <h1>TEST</h1>
        <a>Find out the level of your knowledge</a>
      </div>
      <div class="test-form">
        <div class="test-question" v-for="(question, index) in selectedQuestions" :key="index">
          <h4>{{ index + 1 + '. ' + question.title }}</h4>
          <div class="test-question-content">
            <div class="test-question-text" v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <input
                v-if="!showResults"
                type="checkbox"
                :id="`option_${index}_${optionIndex}`"
                :name="`question_${index}`"
                :value="option.value"
                v-model="selectedAnswers[index][optionIndex]"
                class="custom-checkbox"
              />
              <label
                :for="`option_${index}_${optionIndex}`"
                :class="{
                  'correct-answer': showResults && (question.correctAnswers ?? []).includes(option.value),
                  'selected-answer': 
                  showResults && selectedAnswers[index].includes(option.value) && !(question.correctAnswers ?? []).includes(option.value)
                }"
              >
                {{ String.fromCharCode(97 + optionIndex) + ') ' + option.label }}
              </label>
            </div>
          </div>
        </div>
        <div v-if="showResults">
          <div>Your result: {{ countCorrectAnswers() }}/{{ selectedQuestions.length }}</div>
        </div>
        <div v-if="showResults" class="test-content">
          <div class="test-section">
            <button @click="restartTest" class="check-button" id="restart-button">
              <i class="fa fa-refresh"></i> Restart
            </button>
          </div>
        </div>
        <div v-else class="test-content">
          <div class="test-section">
            <button @click="checkAnswers" class="check-button" id="check-button">
              <i class="fa fa-check-to-slot"></i> Check
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/*__________set main form_________*/
.main-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  background-color: rgba(54, 63, 70, 0);
}

/*____________top text___________*/
.main-form-top-text {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.main-form-top-text a {
  margin-bottom: 0.375rem;
  margin-left: 1rem;
}

/*-----------test section-------*/
.test-form {
  background-color: rgba(134, 213, 225, 0.305);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  overflow: scroll;
  height: 33rem;
}

.test-content {
  display: flex;
  justify-content: center;
}

.test-question{
    margin-bottom: 1rem;
}

.test-question-text {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 0.25rem;
}

.check-button {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  width: 7.5rem;
  border-radius: 1rem;
  background-color: #ed7f1a;
  color: #f4f4f4;
  height: 2.25rem;
  margin-top: 1rem;
  padding-left: 5%;
  padding-right: 5%;
}

label.correct-answer {
  color: green;
  font-weight: bold;
}

label.selected-answer {
  color: red;
  font-weight: bold;
}

.custom-checkbox{
  transform: scale(1.5);
}

</style>
