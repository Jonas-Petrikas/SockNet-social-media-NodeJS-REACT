/*
likes: {
    l:[1,7,6,9,8],
    d: [2,3,4,10]
}
*/

import { faker } from '@faker-js/faker';

export const makeMessagesUsers = (notUserId, usersCount) => {
    const conCount = faker.number.int({ min: 0, max: usersCount / 20 });
    const users = new Set();
    while (users.size < conCount) {
        const id = faker.number.int({ min: 1, max: usersCount })
        if (id !== notUserId) {
            users.add(id);
        }

    }
    return [...users];

}

export const makeLikes = count => {
    const lcount = faker.number.int({ min: 0, max: count })
    const dcount = faker.number.int({ min: 0, max: count - lcount })

    const lSet = new Set();
    while (lSet.size < lcount) {
        lSet.add(faker.number.int({ min: 1, max: count }))
    };

    const dSet = new Set();
    while (dSet.size < dcount) {
        const id = faker.number.int({ min: 1, max: count });
        if (!lSet.has(id)) {
            dSet.add(id)
        }
        // else {
        //     break;
        // }
    };

    return {
        l: [...lSet],
        d: [...dSet]
    }

}