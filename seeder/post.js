



import { faker } from '@faker-js/faker';

export function createPost() {

    return {
        content: faker.lorem.sentences({ min: 1, max: 4 }),
        created_at: faker.date.past({ years: 5 }),
        updated_at: faker.date.recent({ days: 5 }),

    };
}
