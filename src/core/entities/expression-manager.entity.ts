export class ExpressionManager {
  constructor(private readonly expression: string = '') {}

  /**
   * Deconstructs the expression to extract correlation IDs in the format ${correlationId}
   * @returns An array of correlation IDs
   */
  deconstructExpression(): string[] {
    // Regular expression to match correlation IDs in the format ${correlationId}
    const regex = /\$\{([a-zA-Z_][a-zA-Z0-9_-]*)}/g;
    // Initialize an empty array to hold the correlation IDs
    const correlationIds: string[] = [];
    // Use the regex to find all matches in the expression
    let match: string[];
    while ((match = regex.exec(this.expression)) !== null) {
      // Push the captured group (correlation ID) into the array
      correlationIds.push(this.cleanCorrelationId(match[1]));
    }
    return correlationIds;
  }

  /**
   * Cleans the correlation ID by removing $ and {} characters
   * @param correlationId The correlation ID to clean
   * @returns The cleaned correlation ID
   */
  cleanCorrelationId(correlationId: string): string {
    // Remove $ and {} from the correlation ID
    return correlationId.replace(/\$\{|}/g, '').trim();
  }

  /**
   * Parses the expression by replacing correlation IDs with their corresponding values from the provided objects
   * @param objects An array of objects containing correlation IDs and their values
   * @returns The parsed expression with correlation IDs replaced by their values
   */
  parseExpression(objects: any[]): string {
    // Initialize the expression with the original expression
    let parsedExpression = this.expression;
    // Extract the correlation IDs from the expression
    const correlationIds = this.deconstructExpression();
    // Iterate through each correlation ID
    correlationIds.forEach((correlationId) => {
      // Find the corresponding object in the provided array
      const foundObject = objects.find(
        (obj) => obj.correlationId === correlationId,
      );
      // If found, replace the correlation ID in the expression with its value
      if (foundObject) {
        parsedExpression = parsedExpression.replace(
          `\${${correlationId}}`,
          foundObject.value,
        );
      } else {
        throw new Error(`Correlation ID ${correlationId} not found`);
      }
    });
    // Return the parsed expression
    return parsedExpression;
  }
}
