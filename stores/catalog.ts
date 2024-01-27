import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    galleries: [
      { id: 1, title: 'North Carolina' },
      { id: 2, title: 'Texas' },
    ],
    samplePhotos: [
      {
        id: 1,
        title: 'Afternoon Rainstorm',
        href: '#',
        description:
          'An afternoon rainstorm near the community of Clingman, NC',
        imageUrl: '/samplePhotos/Afternoon rainstorm 1.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 24.95,
        size: '1.2 MB',
        galleryID: 1,
        category: 2, //'Foothills'
      },
      {
        id: 2,
        title: 'Afternoon Rainstorm',
        href: '#',
        description:
          'Another image of an afternoon rainstorm near the community of Clingman, NC',
        imageUrl: '/samplePhotos/Afternoon rainstorm 2.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 26.95,
        size: '2.3 MB',
        galleryID: 1,
        category: 2, //'Foothills'
      },
      {
        id: 3,
        title: 'Dune at Nags Head',
        href: '#',
        description: 'Sand dunes at the coast near Nags Head, NC',
        imageUrl: '/samplePhotos/Dunes at coast 1.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 31.95,
        size: '4.1 MB',
        galleryID: 1,
        category: 4, //'Coast'
      },
      {
        id: 4,
        title: 'Beach at Nags Head',
        href: '#',
        description: 'The beach along the coast near Nags Head, NC',
        imageUrl: '/samplePhotos/Dunes at coast 2.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 28.95,
        size: '3.9 MB',
        galleryID: 1,
        category: 4, //'Coast'
      },
      {
        id: 5,
        title: 'Historic plantation houses',
        href: '#',
        description: 'A historic plantation in eastern NC',
        imageUrl: '/samplePhotos/Farm House 2.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 22.95,
        size: '2.7 MB',
        galleryID: 1,
        category: 4, //'Coast'
      },
      {
        id: 6,
        title: 'Historic plantation buildings',
        href: '#',
        description: 'More house at historic plantation in eastern NC',
        imageUrl: '/samplePhotos/Farm Houses.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 22.95,
        size: '3.6 MB',
        galleryID: 1,
        category: 4, //'Coast'
      },
      {
        id: 7,
        title: 'Historic plantation lane',
        href: '#',
        description: 'The lane approaching a historic plantation in eastern NC',
        imageUrl: '/samplePhotos/Farm Lane.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 22.95,
        size: '4.2 MB',
        galleryID: 1,
        category: 4, //'Coast'
      },
      {
        id: 8,
        title: 'Fog in the Morning',
        href: '#',
        description: 'Fog laying low in a field with the foothills of NC',
        imageUrl: '/samplePhotos/Fog in the morning.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 33.95,
        size: '2.9 MB',
        galleryID: 1,
        category: 2, //'Foothills'
      },
      {
        id: 9,
        title: 'Palo Duro Canyon',
        href: '#',
        description: 'A small cousin to the Grand Canyon',
        imageUrl: '/samplePhotos/Palo Duro Canyon.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 41.95,
        size: '3.2 MB',
        galleryID: 2,
        category: 1, //'North/East Texas'
      },
      {
        id: 10,
        title: 'Texas Bluebonnets',
        href: '#',
        description: 'Bluebonnets in the Hill Country of Texas in the Spring',
        imageUrl: '/samplePhotos/Texas Bluebonnets.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 42.95,
        size: '2.9 MB',
        galleryID: 2,
        category: 2, //'Hill Country'
      },
      {
        id: 11,
        title: 'Texas Coast',
        href: '#',
        description: 'The beach along the coats of southeast Texas',
        imageUrl: '/samplePhotos/Texas Coast.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 41.95,
        size: '3.3 MB',
        galleryID: 2,
        category: 3, //'Coast'
      },
      {
        id: 12,
        title: 'West Texas',
        href: '#',
        description: 'The desert plains of west Texas',
        imageUrl: '/samplePhotos/West Texas.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 44.95,
        size: '3.7 MB',
        galleryID: 2,
        category: 4, //'West Texas'
      },
      {
        id: 13,
        title: 'Dallas in the Distance',
        href: '#',
        description: 'View of Dallas',
        imageUrl: '/samplePhotos/Dallas in the Distance.jpg',
        releaseVersion: '1.0.1',
        creationDate: 'Dec 17, 2023',
        price: 39.95,
        size: '3.9 MB',
        galleryID: 2,
        category: 1, //'North/East Texas'
      },
    ],
  }),
  getters: {
    getGalleriesLinks: (state) => {
      return state.galleries.map((gallery) => {
        return { id: gallery.id, title: gallery.title, href: '#' };
      });
    },
    getGalleries: (state) => {
      return state.galleries;
    },
    getGalleryByID: (state) => (id: number) => {
      return state.galleries.find((gallery) => gallery.id === id);
    },
    getPhotoByID: (state) => (id: number) => {
      return state.samplePhotos.find((photo) => photo.id === id);
    },
    getPhotossByGalleryID: (state) => (galleryID: number) => {
      return state.samplePhotos.filter(
        (photo) => photo.galleryID === galleryID
      );
    },
    getPhotosByGalleryIDAndCategory:
      (state) => (galleryID: number, category: number) => {
        return state.samplePhotos.filter(
          (photo) =>
            photo.galleryID === galleryID && photo.category === category
        );
      },
    getPhotosByGalleryIDAndOptionalCategory:
      (state) => (galleryID: number, category: number) => {
        if (category === 0) {
          return state.samplePhotos.filter(
            (photo) => photo.galleryID === galleryID
          );
        } else {
          return state.samplePhotos.filter(
            (photo) =>
              photo.galleryID === galleryID && photo.category === category
          );
        }
      },
  },
  actions: {},
});
