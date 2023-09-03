type ErrorRes = {
  status: number;
  statusText: string;
  message: string;
}

export function isObject(value: unknown): value is object {
  return typeof value === "object" && value != null;
}

export function isErrorResponse(value: unknown): value is ErrorRes {
  if (!isObject(value)) return false;

  if (
    "status" in value && typeof value.status === "number" &&
    "statusText" in value && typeof value.statusText === "string" &&
    "message" in value && typeof value.message === "string"
  ) return true

  return false
}
