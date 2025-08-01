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
          Caleb S. Lewis<br />Photography
        </h2>
        <p class="mt-6 text-lg leading-8 text-white font-semibold">
          Photographic work from Caleb S. Lewis. <br /><br />
          Featuring rural North Carolina and Texas scenery capturing the majesty
          of God's creation.
        </p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div
          class="grid grid-rows-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-3 md:grid-cols-3 md:flex md:gap-x-10 lg:gap-x-10 sm:gap-x-2"
        >
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="inline-flex justify-center text-white">
                Galleries
                <ChevronDownIcon
                  class="-mr-1 mt-1 h-5 w-5 text-white justify-center"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/ncgallery"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >North Carolina Gallery</NuxtLink
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/txgallery"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Texas Gallery</NuxtLink
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <NuxtLink to="/cart" class="pr-4">Your cart</NuxtLink>
          <NuxtLink to="/about">About Caleb</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
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
