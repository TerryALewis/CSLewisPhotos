<template>
  <div class="bg-white py-24 md:py-32 lg:py-40">
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3"
    >
      <div class="mx-auto max-w-2xl lg:mx-0">
        <NuxtLink
          to="/"
          class="text-3xl text-gray-900 font-bold tracking-tight sm:text-4xl"
          >Caleb S. Lewis</NuxtLink
        >
        <!-- <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Caleb S. Lewis
        </h2> -->
        <p class="mt-6 text-lg leading-8 text-gray-600">
          A very creative photographer with the uncanny ability to capture the
          beauty in nature.
        </p>
      </div>
      <ul
        role="list"
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
      >
        <li v-for="person in people" :key="person.name">
          <img
            class="aspect-[3/2] w-full rounded-2xl object-cover"
            :src="person.imageUrl"
            alt=""
          />
          <h3 class="mt-6 text-lg font-semibold leading-8 text-gray-900">
            {{ person.name }}
          </h3>
          <p class="text-base leading-7 text-gray-600">{{ person.role }}</p>
          <p class="mt-4 text-base leading-7 text-gray-600">{{ person.bio }}</p>
          <ul role="list" class="mt-6 flex gap-x-6">
            <li>
              <a
                :href="person.twitterUrl"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Twitter</span>
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                :href="person.linkedinUrl"
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">LinkedIn</span>
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: 'Caleb S. Lewis',
    role: 'Photographer',
    imageUrl: '/images/Caleb.jpg',
    bio: 'Caleb S. Lewis (named after the famous author C.S. Lewis) was born in eastern North Carolina. And, at the age of 3 moved to Texas where he lived for 28 years. During that 28 years, he developed quite a skill of capturing the beauty present in nature. Here at this site he shares some of those photographs captured over the years in Texas and now in North Carolina where he has lived for over 3 years in the western foothills of the state.',
    twitterUrl: '#',
    linkedinUrl: '#',
  },
  // More people...
];
</script>
