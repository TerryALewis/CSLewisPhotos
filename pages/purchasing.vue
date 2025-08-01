<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIconOutline class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      as="template"
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :src="item.imageSrc"
                            :alt="item.imageAlt"
                            class="object-cover object-center"
                          />
                        </div>
                        <a
                          :href="item.href"
                          class="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            class="absolute inset-0 z-10"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div
                      v-for="section in category.sections"
                      :key="section.name"
                    >
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-900"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        role="list"
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                      >
                        <li
                          v-for="item in section.items"
                          :key="item.name"
                          class="flow-root"
                        >
                          <a
                            :href="item.href"
                            class="-m-2 block p-2 text-gray-500"
                            >{{ item.name }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div
                  v-for="page in navigation.pages"
                  :key="page.name"
                  class="flow-root"
                >
                  <a
                    :href="page.href"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >{{ page.name }}</a
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Sign in</a
                  >
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Create account</a
                  >
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                  />
                  <span class="ml-3 block text-base font-medium text-gray-900"
                    >CAD</span
                  >
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p
        class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
      >
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              @click="open = true"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                      ]"
                      >{{ category.name }}</PopoverButton
                    >
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel
                      class="absolute inset-x-0 top-full z-10 text-sm text-gray-500"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                                >
                                  <img
                                    :src="item.imageSrc"
                                    :alt="item.imageAlt"
                                    class="object-cover object-center"
                                  />
                                </div>
                                <a
                                  :href="item.href"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    class="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                            >
                              <div
                                v-for="section in category.sections"
                                :key="section.name"
                              >
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-900"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  role="list"
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in section.items"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a
                                      :href="item.href"
                                      class="hover:text-gray-800"
                                      >{{ item.name }}</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :href="page.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</a
                >
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</a
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</a
                >
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  class="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span
                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                    >0</span
                  >
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main
      class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li
              v-for="(product, productIdx) in products"
              :key="product.id"
              class="flex py-6 sm:py-10"
            >
              <div class="flex-shrink-0">
                <img
                  :src="product.imageSrc"
                  :alt="product.imageAlt"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div
                  class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                >
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          :href="product.href"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ product.name }}</a
                        >
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">{{ product.color }}</p>
                      <p
                        v-if="product.size"
                        class="ml-4 border-l border-gray-200 pl-4 text-gray-500"
                      >
                        {{ product.size }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ product.price }}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${productIdx}`" class="sr-only"
                      >Quantity, {{ product.name }}</label
                    >
                    <select
                      :id="`quantity-${productIdx}`"
                      :name="`quantity-${productIdx}`"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>

                    <div class="absolute right-0 top-0">
                      <button
                        type="button"
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <XMarkIconMini class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                  <CheckIcon
                    v-if="product.inStock"
                    class="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <ClockIcon
                    v-else
                    class="h-5 w-5 flex-shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                  <span>{{
                    product.inStock
                      ? 'In stock'
                      : `Ships in ${product.leadTime}`
                  }}</span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">$99.00</dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  href="#"
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only"
                    >Learn more about how shipping is calculated</span
                  >
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only"
                    >Learn more about how tax is calculated</span
                  >
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$8.32</dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">$112.32</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>

      <!-- Related products -->
      <section aria-labelledby="related-heading" class="mt-24">
        <h2 id="related-heading" class="text-lg font-medium text-gray-900">
          You may also like&hellip;
        </h2>

        <div
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="group relative"
          >
            <div
              class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
            >
              <img
                :src="relatedProduct.imageSrc"
                :alt="relatedProduct.imageAlt"
                class="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a :href="relatedProduct.href">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ relatedProduct.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ relatedProduct.color }}
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{ relatedProduct.price }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer aria-labelledby="footer-heading" class="bg-white">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-t border-gray-200 py-20">
          <div
            class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16"
          >
            <!-- Image section -->
            <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
                class="h-8 w-auto"
              />
            </div>

            <!-- Sitemap sections -->
            <div
              class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2"
            >
              <div
                class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Products</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li
                      v-for="item in footerNavigation.products"
                      :key="item.name"
                      class="text-sm"
                    >
                      <a
                        :href="item.href"
                        class="text-gray-500 hover:text-gray-600"
                        >{{ item.name }}</a
                      >
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Company</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li
                      v-for="item in footerNavigation.company"
                      :key="item.name"
                      class="text-sm"
                    >
                      <a
                        :href="item.href"
                        class="text-gray-500 hover:text-gray-600"
                        >{{ item.name }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  Customer Service
                </h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li
                    v-for="item in footerNavigation.customerService"
                    :key="item.name"
                    class="text-sm"
                  >
                    <a
                      :href="item.href"
                      class="text-gray-500 hover:text-gray-600"
                      >{{ item.name }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Newsletter section -->
            <div
              class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1"
            >
              <h3 class="text-sm font-medium text-gray-900">
                Sign up for our newsletter
              </h3>
              <p class="mt-6 text-sm text-gray-500">
                The latest deals and savings, sent to your inbox weekly.
              </p>
              <form class="mt-2 flex sm:max-w-md">
                <label for="email-address" class="sr-only">Email address</label>
                <input
                  id="email-address"
                  type="text"
                  autocomplete="email"
                  required=""
                  class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div class="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">
            &copy; 2021 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/vue/20/solid';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
];
const relatedProducts = [
  {
    id: 1,
    name: 'Billfold Wallet',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'Front of Billfold Wallet in natural leather.',
    price: '$118',
    color: 'Natural',
  },
  // More products...
];
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
};

const open = ref(false);
</script>
