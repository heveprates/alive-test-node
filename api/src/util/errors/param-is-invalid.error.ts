export class ParamIsInvalidError extends Error {
  constructor(paramName: string) {
    super(`Param '${paramName}' is invalid`);
  }
}
