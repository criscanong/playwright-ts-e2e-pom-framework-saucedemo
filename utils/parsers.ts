/**
 * Extracts a numeric value from a price label string.
 * e.g. "Item total: $7.99" → 7.99
 *      "$29.99" → 29.99
 */
export function parsePriceLabel(text: string): number {
    const match = text.match(/[\d.]+/);
    if (!match) throw new Error(`Could not parse price from: "${text}"`);
    return parseFloat(match[0]);
}