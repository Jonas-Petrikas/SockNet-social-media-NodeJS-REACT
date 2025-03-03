



import { faker } from '@faker-js/faker';

export function createPost() {

    return {
        content: faker.word.words({ count: { min: 6, max: 100 } }),
        created_at: faker.date.past({ years: 5 }),
        updated_at: faker.date.recent({ days: 5 }),

    };
}
