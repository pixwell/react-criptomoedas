
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