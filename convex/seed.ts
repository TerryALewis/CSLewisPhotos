import { internalMutation } from './_generated/server';

export const seedPhotos = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Sample NC photos
    const ncPhotos = [
      {
        title: 'NC Coast',
        description: 'Beautiful coastal scenery',
        imageUrl: '/images/NCCoast.jpg',
        category: 'NC',
        location: 'North Carolina Coast',
        price: 25.0,
        tags: ['coast', 'ocean', 'landscape'],
      },
      {
        title: 'NC Mountains',
        description: 'Scenic mountain views',
        imageUrl: '/images/NCMountains.jpg',
        category: 'NC',
        location: 'North Carolina Mountains',
        price: 25.0,
        tags: ['mountains', 'landscape', 'nature'],
      },
      {
        title: 'NC Foothills',
        description: 'Rolling hills of North Carolina',
        imageUrl: '/images/NCFoothills.jpg',
        category: 'NC',
        location: 'North Carolina Foothills',
        price: 25.0,
        tags: ['foothills', 'landscape', 'nature'],
      },
    ];

    // Sample TX photos
    const txPhotos = [
      {
        title: 'Texas Bluebonnets',
        description: 'Spring wildflowers in Texas',
        imageUrl: '/samplePhotos/Texas Bluebonnets.jpg',
        category: 'TX',
        location: 'Texas Hill Country',
        price: 25.0,
        tags: ['wildflowers', 'spring', 'texas'],
      },
      {
        title: 'Palo Duro Canyon',
        description: 'Stunning canyon views in Texas',
        imageUrl: '/samplePhotos/Palo Duro Canyon.jpg',
        category: 'TX',
        location: 'Palo Duro Canyon State Park',
        price: 30.0,
        tags: ['canyon', 'landscape', 'texas', 'desert'],
      },
      {
        title: 'West Texas Landscape',
        description: 'Vast open spaces of West Texas',
        imageUrl: '/samplePhotos/West Texas.jpg',
        category: 'TX',
        location: 'West Texas',
        price: 25.0,
        tags: ['landscape', 'desert', 'texas', 'open'],
      },
      {
        title: 'Texas Coast',
        description: 'Beautiful Texas coastline',
        imageUrl: '/samplePhotos/Texas Coast.jpg',
        category: 'TX',
        location: 'Texas Gulf Coast',
        price: 25.0,
        tags: ['coast', 'ocean', 'texas', 'beach'],
      },
      {
        title: 'Farm Houses',
        description: 'Rural Texas farm houses',
        imageUrl: '/samplePhotos/Farm Houses.jpg',
        category: 'TX',
        location: 'Rural Texas',
        price: 20.0,
        tags: ['rural', 'farm', 'texas', 'countryside'],
      },
      {
        title: 'Thunderstorm at Sunset',
        description: 'Dramatic storm clouds at sunset',
        imageUrl: '/samplePhotos/Thunderstorm at sunset 1.jpg',
        category: 'TX',
        location: 'Texas Plains',
        price: 35.0,
        tags: ['storm', 'sunset', 'dramatic', 'weather'],
      },
    ];

    // Insert photos
    for (const photo of [...ncPhotos, ...txPhotos]) {
      await ctx.db.insert('photos', {
        ...photo,
        isAvailable: true,
        createdAt: Date.now(),
      });
    }
  },
});
