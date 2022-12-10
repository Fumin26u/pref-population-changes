interface PopulationByAge {
    year: number
    value: number
}

export interface PopulationInfo {
    label: string
    data: PopulationByAge[]
}

export interface Pref {
    prefCode: number
    prefName: string
    prefId: string
}

export interface PrefInfo extends Pref {
    population: PopulationInfo[]
}

export interface PrefCharts {
    name: string
    data: number[]
}
