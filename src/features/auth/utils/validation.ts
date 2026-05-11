export function isValidEmail(value: string): boolean {
  const v = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isStrongEnoughPassword(password: string): boolean {
  return password.length >= 6;
}
