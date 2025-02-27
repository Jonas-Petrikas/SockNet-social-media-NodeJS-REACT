/*
likes: {
    l:[1,7,6,9,8],
    d: [2,3,4,10]
}
*/

import { faker } from '@faker-js/faker';

export const makeLikes = count => {
    const lcount = faker.number.int({ min: 0, max: count })
    const dcount = faker.number.int({ min: 0, max: count - lcount })

    const lSet = new Set();
    do {
        lSet.add(faker.number.int({ min: 1, max: count }))
    } while (lSet.size < lcount);

    const dSet = new Set();
    do {
        const id = faker.number.int({ min: 1, max: count });
        if (!lSet.has(id)) {
            dSet.add(id)
        }

    } while (dSet.size < dcount);

    return {
        l: [...lSet],
        d: [...dSet]
    }

}