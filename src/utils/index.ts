export function omitProperty<T extends object, K extends keyof T>(
    obj: T,
    propToOmit: K
): Omit<T, K> {
    // Use destructuring to exclude the property
    const { [propToOmit]: _, ...rest } = obj;
    return rest;
}