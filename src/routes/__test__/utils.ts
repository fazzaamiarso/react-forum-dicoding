/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { faker } from "@faker-js/faker";

export const createUser = () => {
  return { id: faker.string.uuid(), name: faker.person.fullName(), email: faker.internet.email(), avatar: "" };
};

export const createLeaderboardItem = () => {
  return {
    user: createUser(),
    score: faker.number.int(50),
  };
};

export const createThreadItem = () => {
  return {
    id: faker.string.uuid(),
    title: faker.word.words(),
    body: faker.lorem.sentences(),
    category: faker.company.buzzNoun(),
    createdAt: faker.date.anytime(),
    ownerId: faker.string.uuid(),
    upVotesBy: faker.helpers.multiple(faker.string.uuid),
    downVotesBy: faker.helpers.multiple(faker.string.uuid),
    totalComments: faker.number.int(100),
  };
};

export const createComment = () => {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.sentences(),
    createdAt: faker.date.anytime(),
    owner: createUser(),
    upVotesBy: faker.helpers.multiple(faker.string.uuid),
    downVotesBy: faker.helpers.multiple(faker.string.uuid),
  };
};

export const createThreadDetail = () => {
  return {
    ...createThreadItem(),
    comments: faker.helpers.multiple(createComment),
  };
};
