import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

export function KZTToUSD(amount) {
    const usd = parseInt(process.env.USD)
    return Math.round((amount / usd) * 100) / 100
}