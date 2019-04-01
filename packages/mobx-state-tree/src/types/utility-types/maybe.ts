import {
    union,
    optional,
    IType,
    undefinedType,
    nullType,
    IAnyType,
    ExtractC,
    ExtractS,
    assertIsType,
    ExtractTWithoutSTN
} from "../../internal"

const optionalUndefinedType = optional(undefinedType, undefined)
const optionalNullType = optional(nullType, null)

/** @hidden */
export interface IMaybeIType<IT extends IAnyType, C, O>
    extends IType<ExtractC<IT> | C, ExtractS<IT> | O, ExtractTWithoutSTN<IT> | O> {}

/** @hidden */
export interface IMaybe<IT extends IAnyType> extends IMaybeIType<IT, undefined, undefined> {}

/** @hidden */
export interface IMaybeNull<IT extends IAnyType> extends IMaybeIType<IT, null | undefined, null> {}

/**
 * `types.maybe` - Maybe will make a type nullable, and also optional.
 * The value `undefined` will be used to represent nullability.
 *
 * @param type
 * @returns
 */
export function maybe<IT extends IAnyType>(type: IT): IMaybe<IT> {
    assertIsType(type, 1)

    return union(type, optionalUndefinedType)
}

/**
 * `types.maybeNull` - Maybe will make a type nullable, and also optional.
 * The value `null` will be used to represent no value.
 *
 * @param type
 * @returns
 */
export function maybeNull<IT extends IAnyType>(type: IT): IMaybeNull<IT> {
    assertIsType(type, 1)

    return union(type, optionalNullType)
}

/** @hidden */
export type RemoveMaybeType<IT extends IAnyType> = IT extends IMaybe<infer T1>
    ? T1
    : IT extends IMaybeNull<infer T2>
    ? T2
    : IT
