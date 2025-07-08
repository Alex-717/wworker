<template>
  <div>
    <!-- <h1>Web<br />Workers<br />basic<br />example</h1> -->

    <div class="controls" tabindex="0">
      <form>
        <div>
          <label for="number1">Multiply number 1: </label>
          <input type="text" ref="number1Ref" value="0" />
        </div>
        <div>
          <label for="number2">Multiply number 2: </label>
          <input type="text" ref="number2Ref" value="0" />
        </div>
      </form>

      <p class="result" ref="resultRef">Result: 0</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  init()
})
const number1Ref = ref(null)
const number2Ref = ref(null)
const resultRef = ref(null)
let myWorker = null

function init () {
  if (window.Worker) {
    myWorker = new Worker(new URL('../workers/commonWorker/worker1.js', import.meta.url))

    ;[number1Ref.value, number2Ref.value].map(input => {
      input.onchange = e => {
        myWorker.postMessage([number1Ref.value.value, number2Ref.value.value])
      }
    })
    myWorker.onmessage = e => {
      if (e.data.type === 'result') {
        resultRef.value.textContent = e.data.data;
      } else if (e.data.type === 'error') {
        resultRef.value.textContent = 'Error: ' + e.data.message;
      }
    }

    // woker内部错误
    myWorker.onerror = e => {
      console.log('worker error****', e.message)
    }
  } else {
    console.log('浏览器不支持worker')
  }
}

// test
// setTimeout(() => {
//   router.push('/')
// }, 3000)

onBeforeUnmount(() => {
  if (myWorker) {
    console.log('8888888888')
    myWorker.terminate()
  }
})

</script>

<style lang="scss" scoped>
html {
  background-color: rgb(230, 230, 230);
  font-family: sans-serif;
}

p {
  margin: 0 0 1rem 0;
}

.controls {
  padding: 4vw;
  width: 75%;
  margin: 3vw auto;
  border: 2px solid;
  border-radius: 6px;
}

.controls label,
.controls p,
.controls input {
  font-size: 3vw;
}

.controls div {
  padding-bottom: 1rem;
}
</style>