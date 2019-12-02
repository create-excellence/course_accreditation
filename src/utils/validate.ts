// export const isValidCode = (str: string) => /\d{3,}/.test(str);

export const isExternal = (path: string) =>
  /^(https?:|mailto:|tel:)/.test(path)
