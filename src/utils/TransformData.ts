/* eslint-disable @typescript-eslint/no-explicit-any */

// Generic function to transform data

function transformData<T>(
  rawData: any[],
  validateStatus: (status: string) => any
): T[] {
  return rawData.map((item) => ({
    ...item,
    "request date": new Date(item["request date"]).toUTCString(),
    status: validateStatus(item.status),
  }));
}

// Generic function to validate status of reieved data

function validateStatus<T extends string>(
  status: string,
  validStatuses: ReadonlyArray<T>
): T {
  if (!validStatuses.includes(status as T)) {
    throw new Error(`Invalid status value: ${status}`);
  }
  return status as T;
}

export { transformData, validateStatus };
