export function createEventTargetValue(value) {
  return {
    target: {
      value,
    },
    preventDefault: () => {},
  };
};

export function createBasicEvent(value) {
  return {
    preventDefault: () => {},
  };
};

