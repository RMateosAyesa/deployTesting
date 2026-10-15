export interface GetLithiumSystemDataRequestDto {
  sensors: string[]
}

export interface LithiumSystemSensorDataDto {
  sensor: string
  timestamp: string
  value: number | string | boolean
  dataFrom: string
  origin: string
  location: string
  variable: string
}

export interface GetLithiumSystemDataResponseDto {
  items: LithiumSystemSensorDataDto[]
}
