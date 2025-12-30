export function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
