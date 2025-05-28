import { PropertyGraph } from '../property-graph/property-graph.entity';
import { CharacterProperty } from './character-property.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from './derived-number-metadata.entity';
import { Parser } from 'expr-eval';
import { Character } from '../character/character.entity';
import { ExpressionManager } from '../expression-manager.entity';

export class PropertyManager {
  /**
   * Returns the calculation order of properties based on their dependencies
   * @param properties Array of CharacterProperty
   * @returns Array of CharacterProperty in the order they should be calculated
   */
  private getCalculationOrder(
    properties: CharacterProperty[],
  ): CharacterProperty[] {
    // Create a new PropertyGraph instance
    const propertyGraph = new PropertyGraph(properties);
    // Initialize an empty array to hold the calculation order
    const calculationOrder: string[] = propertyGraph.topologicalSort();
    // Initialize an empty array to hold the final order
    const finalOrder: CharacterProperty[] = [];
    // Iterate through the calculation order
    for (const correlationId of calculationOrder) {
      // Find the corresponding property in the original properties array
      const property: CharacterProperty = properties.find(
        (p: CharacterProperty) => p.guid === correlationId,
      );
      // If found, push it to the final order
      if (property) {
        finalOrder.push(property);
      }
    }
    return finalOrder;
  }

  /**
   * Safely evaluates a mathematical expression
   * @param expression The expression to evaluate
   * @returns The result of the expression
   */
  private evaluateExpression(expression: string): number {
    const expr = new Parser().parse(expression);
    const result = expr.evaluate();
    // Check if the result is a number
    if (typeof result === 'number') {
      return result;
    } else {
      throw new Error('Expression did not evaluate to a number');
    }
  }

  /**
   * Calculates the properties based on their dependencies
   * @param properties Array of CharacterProperty
   * @returns Array of CharacterProperty with calculated values
   */
  calculateProperties(properties: CharacterProperty[]): CharacterProperty[] {
    // Get the calculation order
    const calculationOrder = this.getCalculationOrder(properties);
    // Iterate through the properties in the calculation order
    for (const property of calculationOrder) {
      // If the property is a derived number, parse and evaluate its expression
      if (property.type === PropertyTypes.DERIVED_NUMBER) {
        const expression = new ExpressionManager(
          (property.metadata as DerivedNumberMetadata).expression,
        );
        // Set the value of the property to the result
        property.value = this.evaluateExpression(
          expression.parseExpression(properties),
        );
      }
    }
    return properties;
  }

  /**
   * Adds a property to a character
   * @param character The character to add the property to
   * @param property The property to add
   */
  addPropertyToCharacter(
    character: Character,
    property: CharacterProperty,
  ): Character {
    // Check if the property already exists in the character
    const existingProperty = character.properties.find(
      (p) => p.guid === property.guid,
    );
    // If it exists throw an error
    if (existingProperty) {
      throw new Error(
        `Property with correlation ID ${property.guid} already exists in character`,
      );
    }
    // Add the property to the character
    character.properties.push(property);
    // Return the updated character
    return character;
  }
}
