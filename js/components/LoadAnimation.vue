<template>
  <div class="animation-root">
    <div class="frame">
      <div class="plane-container">
        <a href="#" target="_blank">
          <svg class="plane" />
        </a>
      </div>
    </div>
    <div class="clouds">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="762px"
        height="331px"
        viewBox="0 0 762 331"
        enable-background="new 0 0 762 331"
        xml:space="preserve"
        class="cloud big front slowest"
      >
        <path
          fill="#FFFFFF"
          d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
        />
      </svg>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="762px"
        height="331px"
        viewBox="0 0 762 331"
        enable-background="new 0 0 762 331"
        xml:space="preserve"
        class="cloud distant smaller"
      >
        <path
          fill="#FFFFFF"
          d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
        />
      </svg>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="762px"
        height="331px"
        viewBox="0 0 762 331"
        enable-background="new 0 0 762 331"
        xml:space="preserve"
        class="cloud small slow"
      >
        <path
          fill="#FFFFFF"
          d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
        />
      </svg>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="762px"
        height="331px"
        viewBox="0 0 762 331"
        enable-background="new 0 0 762 331"
        xml:space="preserve"
        class="cloud distant super-slow massive"
      >
        <path
          fill="#FFFFFF"
          d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
        />
      </svg>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="762px"
        height="331px"
        viewBox="0 0 762 331"
        enable-background="new 0 0 762 331"
        xml:space="preserve"
        class="cloud slower"
      >
        <path
          fill="#FFFFFF"
          d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadAnimation",
};
</script>
<style >
* {
  position: relative;
}

.frame {
  width: 500px;
  height: auto;
  margin: 15% auto 0;
  position: absolute;
  width: 100%;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}

/**
 * Paper Plane
 */
/*Paper Plane: Container*/
.plane-container {
  width: 200px;
  margin: 0px auto;
  z-index: 3;
}
/*Paper Plane: Image*/
.plane {
  width: 100%;
  height: 60px;
}

/*Paper Plane: Animation*/
.plane-container {
  -webkit-animation: paper-plane-scoping 12s alternate infinite;
  -moz-animation: paper-plane-scoping 12s alternate infinite;
  animation: paper-plane-scoping 12s alternate infinite;

  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

@-webkit-keyframes paper-plane-scoping {
  0% {
    -webkit-transform: translateY(50px);
    -moz-transform: translateY(50px);
    transform: translateY(50px);
  }
  100% {
    -webkit-transform: translateY(-50px);
    -moz-transform: translateY(-50px);
    transform: translateY(-50px);
  }
}

.plane {
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;

  -webkit-animation: paper-plane-soaring 24s forwards infinite;
  -moz-animation: paper-plane-soaring 24s forwards infinite;
  animation: paper-plane-soaring 24s forwards infinite;
}
@-webkit-keyframes paper-plane-soaring {
  0% {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-90deg);
    transform: rotate(-1deg);
  }

  40% {
    -webkit-transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    transform: rotate(-25deg);
  }

  60% {
    -webkit-transform: rotate(-15deg);
    -moz-transform: rotate(-15deg);
    transform: rotate(15deg);
  }

  100% {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(15deg);
    transform: rotate(-1deg);
  }
}

/**
 * Clouds
 */
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform: translateZ(0);
}

.cloud {
  position: absolute;
  top: 20%;
  width: 300px;
  right: 0;
  opacity: 1;
}

.cloud.front {
  z-index: 9;
}

.cloud.distant {
  z-index: 1;
}

.cloud.background {
  z-index: 1;
}

/*Cloud Sizing*/
.cloud.smaller {
  margin-right: 360px;
  width: 84px;
  margin-top: 50px;
}

.cloud.small {
  margin-right: 100px;
  width: 70px;
}

.cloud.big {
  width: 300px;
  margin-top: 50px;
  margin-right: 100px;
}

.cloud.massive {
  width: 500px;
  margin-top: 20px;
  margin-right: 0px;
}

/*Cloud: Animation*/
.cloud {
  -webkit-animation-name: cloud-movement;
  -webkit-animation-timing-function: linear;
  -webkit-animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 8s;

  -moz-animation-name: cloud-movement;
  -moz-animation-timing-function: linear;
  -moz-animation-direction: forwards;
  -moz-animation-iteration-count: infinite;
  -moz-animation-duration: 8s;

  animation-name: cloud-movement;
  animation-timing-function: linear;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-duration: 8s;
}

.slow {
  -webkit-animation-duration: 9.2s;
  -moz-animation-duration: 9.2s;
  animation-duration: 9.2s;
}

.slower {
  -webkit-animation-duration: 11.2s;
  -moz-animation-duration: 11.2s;
  animation-duration: 11.2s;
}

.slowest {
  -webkit-animation-duration: 13.5s;
  -moz-animation-duration: 13.5s;
  animation-duration: 13.5s;
}

.super-slow {
  -webkit-animation-duration: 20.5s;
  -moz-animation-duration: 20.5s;
  animation-duration: 20.5s;
}

@-webkit-keyframes cloud-movement {
  0% {
    opacity: 0.1;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    transform: translateX(300px);
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(-1000px);
    -moz-transform: translateX(-1000px);
    transform: translateX(-1000px);
  }
}
</style>
 