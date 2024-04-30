// Utility function to process requests in chunks
export const processInBatches = async <T>(
  items: T[],
  batchSize: number,
  processFunc: (item: T) => Promise<any>,
): Promise<any[]> => {
  const results: any[] = []
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize)
    const batchResults = await Promise.all(
      batch.map((item) => processFunc(item)),
    )
    results.push(...batchResults)
  }
  return results
}
