export const isValidCode = (str: string) => /\d{3,}/.test(str);

export const isValidUsername = (str: string) =>
  ["admin", "editor"].indexOf(str.trim()) >= 0;

export const isExternal = (path: string) =>
  /^(https?:|mailto:|tel:)/.test(path);
