import { ServerRespond } from './DataStreamer'

export interface Row {
  price_abc: number
  price_def: number
  ratio: number
  upper_bound: number
  lower_bound: number
  trigger_alert: number | undefined
  timestamp: Date
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC: number =
      (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2.0
    const priceDEF: number =
      (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2.0
    const ratio: number = priceABC / priceDEF
    const [upperBound, lowerBound]: [number, number] = [1 + 0.05, 1 - 0.05]
    const triggerAlert: number | undefined =
      ratio < lowerBound || ratio > upperBound ? ratio : undefined
    const timeStamp: Date =
      serverResponds[0].timestamp > serverResponds[1].timestamp
        ? serverResponds[0].timestamp
        : serverResponds[1].timestamp

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
      timestamp: timeStamp,
    }
  }
}
