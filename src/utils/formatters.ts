
export function formatPrice(value: number): string{
    const formattedValue = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)

    return formattedValue;
}

export function formatPriceCompact(value: number): string{
    const formattedValue = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
    }).format(value)

    return formattedValue;
}

export function formatNumberCompact(value: number): string{
    const formattedValue = Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short' // short ou 'long' para por extenso (ex: "milhão")
    }).format(value)

    return formattedValue;
}