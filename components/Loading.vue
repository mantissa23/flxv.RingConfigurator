<template>
  <div
    v-if="loading"
    class="loading">
    <div class="spinner-wrap">
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearInterval, setTimeout } from 'timers';
let timer = 0;
export default {
  data: () => ({
    /**
     * Флаг загрузки
     * @type {Boolean}
     */
    loading: true,

    /**
     * Таймаут сброса флага (мс)
     * @type {Number}
     */
    timeout: 10000,
  }),
  watch: {
    loading(val) {
      if (val === true) {
        this.setTimer();
      }
    },
  },
  created () {
    this.setTimer();
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    setTimer() {
      clearInterval(timer);

      timer = setTimeout(() => {
        this.loading = false;
        console.warn('[components/Loading/timeout]: reset on timeout');
      }, this.timeout);
    },
  }
};
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background: rgba(99, 0, 59, 0.3);
}
.spinner-wrap {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 100%;
  height: 100%;
  position: absolute;

  -webkit-animation: sk-rotate 2s infinite linear;
  animation: sk-rotate 2s infinite linear;
}

.dot1,
.dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: rgba(99, 0, 59, 0.9);
  border-radius: 100%;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
