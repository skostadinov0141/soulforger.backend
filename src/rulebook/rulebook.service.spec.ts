import { Test, TestingModule } from '@nestjs/testing';
import { RulebookService } from './rulebook.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Rulebook, RulebookSchema } from './entities/rulebook.entity';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { I18nService } from 'nestjs-i18n';

describe('RulebookService', () => {
  let service: RulebookService;
  let model: Model<Rulebook>;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RulebookService,
        {
          provide: I18nService,
          useValue: {
            t: jest.fn().mockImplementation((str) => str),
          },
        },
      ],
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Rulebook.name, schema: RulebookSchema },
        ]),
      ],
    }).compile();

    service = module.get<RulebookService>(RulebookService);
    model = module.get<Model<Rulebook>>(getModelToken(Rulebook.name));
  });

  afterAll(async () => {
    // Clean up the in-memory database
    await mongod.stop();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await model.deleteMany({}).exec();
  });

  describe('getAll', () => {
    it('should return the first 10 rulebooks', async () => {
      // Arrange
      const rulebooks = Array.from({ length: 15 }, (_, i) => ({
        name: `Rulebook ${i}`,
        description: `Description ${i}`,
      }));
      await model.insertMany(rulebooks);

      // Act
      const result = await service.findAll(0, 10);

      // Assert
      expect(result).toHaveLength(10);
      expect(result[0].name).toBe('Rulebook 0');
      expect(result[9].name).toBe('Rulebook 9');
    });

    it('should return the next 10-15 rulebooks', async () => {
      // Arrange
      const rulebooks = Array.from({ length: 15 }, (_, i) => ({
        name: `Rulebook ${i}`,
        description: `Description ${i}`,
      }));
      await model.insertMany(rulebooks);

      // Act
      const result = await service.findAll(1, 10);

      // Assert
      expect(result).toHaveLength(5);
      expect(result[0].name).toBe('Rulebook 10');
      expect(result[4].name).toBe('Rulebook 14');
    });
  });

  describe('getById', () => {
    it('should return a rulebook by ID', async () => {
      // Arrange
      const rulebook = await model.create({
        name: 'Rulebook 1',
        description: 'Description 1',
      });

      // Act
      const result = await service.findOne(rulebook._id);

      // Assert
      expect(result.name).toBe('Rulebook 1');
      expect(result.description).toBe('Description 1');
    });

    it('should throw an error if the rulebook does not exist', async () => {
      // Act and assert
      await expect(service.findOne('123456789012')).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a rulebook', async () => {
      // Act
      const result = await service.create({
        name: 'Rulebook 1',
        description: 'Description 1',
      });

      // Assert
      expect(result.name).toBe('Rulebook 1');
      expect(result.description).toBe('Description 1');
    });

    it('should throw an error if the rulebook already exists', async () => {
      // Arrange
      await model.create({
        name: 'Rulebook 1',
        description: 'Description 1',
      });

      // Act and assert
      await expect(
        service.create({
          name: 'Rulebook 1',
          description: 'Description 1',
        }),
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a rulebook', async () => {
      // Arrange
      const rulebook = await model.create({
        name: 'Rulebook 1',
        description: 'Description 1',
      });

      // Act
      const result = await service.update(rulebook._id, {
        name: 'Rulebook 2',
        description: 'Description 2',
      });

      // Assert
      expect(result.name).toBe('Rulebook 2');
      expect(result.description).toBe('Description 2');
    });

    it('should throw an error if the rulebook does not exist', async () => {
      // Act and assert
      await expect(
        service.update('123456789012', {
          name: 'Rulebook 2',
          description: 'Description 2',
        }),
      ).rejects.toThrow();
    });
  });
});
