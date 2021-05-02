export const DB = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init: () => {},
  getInstance: () => {
    return {
      transaction: () => {
        return {
          commit: jest.fn(),
          rollback: jest.fn(),
        };
      },
    };
  },
};
