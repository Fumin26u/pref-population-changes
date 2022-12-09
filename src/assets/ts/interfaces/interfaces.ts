interface PopulationByAge {
    year: number
    value: number
}

export interface PopulationInfo {
    label: string
    data: PopulationByAge[]
}

export interface Prefecture {
    prefCode: number
    prefName: string
    prefId: string
    population?: PopulationInfo[]
}
