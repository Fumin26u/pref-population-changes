interface PopulationByAge {
    year: number
    value: number
}

export interface PopulationInfo {
    label: string
    data: PopulationByAge[]
}

export interface PrefInfo {
    prefCode: number
    prefName: string
    prefId: string
    population?: PopulationInfo[]
}

export interface PrefCharts {
    label: string
    data: number[]
}
