<script lang="ts" setup>
import { useMainStore } from "../stores";

const store = useMainStore();
</script>

<template>
  <div id="loader-wrapper" :class="!store.isLoading ? 'loaded' : null">
    <div class="loader">
      <div class="lod">
        <span>&lt;</span>
        <span>&nbsp;LOADING</span>
        <span>/&gt;</span>
      </div>
    </div>
    <div class="loader-section section-left" />
    <div class="loader-section section-right" />
  </div>
</template>

<style lang="scss" scoped>
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999;
  overflow: hidden;

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .lod {
      z-index: 2;
      font-size: 2em;
      font-weight: 900;
    }

    .lod > * {
      color: rgb(255, 255, 255);
    }

    .lod span {
      display: inline-flex;
    }

    .lod span:nth-child(2) {
      letter-spacing: -1em;
      overflow: hidden;
      animation: reveal 2000ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite alternate;
    }

    @keyframes reveal {
      0%,
      100% {
        opacity: 0.5;
        letter-spacing: -1em;
      }
      50% {
        opacity: 1;
        letter-spacing: 1em;
      }
    }
  }

  .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: #333;
    z-index: 1;

    &.section-left {
      left: 0;
    }

    &.section-right {
      right: 0;
    }
  }

  &.loaded {
    visibility: hidden;
    transform: translateY(-100%);
    transition:
      transform 0.3s 1s ease-out,
      visibility 0.3s 1s ease-out;

    .loader {
      .loader-circle,
      .loader-text {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    }

    .loader-section {
      &.section-left {
        transform: translateX(-100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }

      &.section-right {
        transform: translateX(100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
