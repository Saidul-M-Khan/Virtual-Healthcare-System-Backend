const pick = <T extends Record<string, unknown>, k extends keyof T>(object: T, keys: k[]): Partial<T> => {
    const finalObject: Partial<T> = {};
    for (const key of keys) {
        if (object && Object.hasOwnProperty.call(object, key)) {
            finalObject[key] = object[key]
        }
    }
    console.log(finalObject);
    return finalObject;
}

export default pick;