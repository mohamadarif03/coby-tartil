type HijaiyahLetterType = { arabic: string, read: string }

export type HijaiyahLetterGroupType = {
    name: string,
    base: HijaiyahLetterType,
    a: HijaiyahLetterType,
    i: HijaiyahLetterType,
    u: HijaiyahLetterType,
    aa: HijaiyahLetterType,
    uu: HijaiyahLetterType,
    ii: HijaiyahLetterType,
    sukun: HijaiyahLetterType,
    tasydid: HijaiyahLetterType,
}