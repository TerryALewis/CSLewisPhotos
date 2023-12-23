<template>
  <div
    class="relative isolate overflow-hidden bg-gray-900 h-screen py-24 sm:py-32"
  >
    <img
      src="/samplePhotos/Afternoon rainstorm 1.jpg"
      alt=""
      class="absolute inset-0 -z-10 h-screen w-screen object-cover object-right md:object-center"
    />
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Caleb Lewis<br />Photography
        </h2>
        <p class="mt-6 text-lg leading-8 text-white font-semibold">
          Photographic work from Caleb Lewis. <br />
          Featuring rural North Carolina and Texas scenery capturing the majesty
          of God's creation.
        </p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10"
        >
          <NuxtLink to="/ncgallery" class="pr-4">Gallery</NuxtLink>
          <NuxtLink to="/purchasing" class="pr-4"
            >Purchasing Photographs</NuxtLink
          >
          <NuxtLink to="/about">About Caleb</NuxtLink>
        </div>
        <dl
          class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div class="container">
            <NuxtLink to="/ncgallery">
              <img
                src="/assets/images/NC-Map.png"
                alt="North Carolina Map"
                class="object-cover object-center rounded-lg shadow-lg text-white bg-transparent w-48 h-20"
              />
              <div
                class="position: absolute bg-transparent text-sm vertical-align: middle text-align: center left-0 top-0 justify-center items-center font-semibold text-white transition duration-300 ease-in-out"
              >
                <span class="text-black">North Carolina Gallery</span>
              </div>
            </NuxtLink>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  { name: 'Gallery', to: '/ncgallery' },
  { name: 'Purchasing photographs', to: '/purchasing' },
  { name: 'About Caleb', to: '/about' },
];

const stateGalleries = [
  { name: 'North Carolina Gallery', href: '#' },
  { name: 'Texas Gallery', href: '#' },
];

// when using the vector map of NC, must either purchase the image or give credit to the author
//https://freevectormaps.com/united-states/north-carolina/US-NC-EPS-02-8001?ref=atr
</script>

<style scoped>
.container {
  position: relative;
  display: inline-block;
}

.image {
  display: block;
  max-width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.container:hover .overlay {
  opacity: 1;
}
</style>
