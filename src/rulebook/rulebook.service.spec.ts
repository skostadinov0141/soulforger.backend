import { Test, TestingModule } from '@nestjs/testing';
import { RulebookService } from './rulebook.service';
import { getModelToken } from '@nestjs/mongoose';
import { Rulebook } from './entities/rulebook.entity';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';

describe('RulebookService', () => {
  let service: RulebookService;
  let model: Model<Rulebook>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RulebookService,
        {
          provide: getModelToken(Rulebook.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
            findById: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn().mockImplementation((str) => str),
          },
        },
      ],
    }).compile();

    service = module.get<RulebookService>(RulebookService);
    model = module.get<Model<Rulebook>>(getModelToken(Rulebook.name));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return the first 10 rulebooks', async () => {
      // Arrange
      const rulebooks = Array.from({ length: 15 }, (_, i) => ({
        name: `Rulebook ${i}`,
        description: `Description ${i}`,
      }));
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(rulebooks.slice(0, 10)),
      } as any);

      // Act
      const result = await service.findAll(0, 10);

      // Assert
      expect(result).toHaveLength(10);
      expect(model.find).toHaveBeenCalledWith({}, null, { skip: 0, limit: 10 });
      expect(result[0].name).toBe('Rulebook 0');
      expect(result[9].name).toBe('Rulebook 9');
    });

    it('should return the next 10-15 rulebooks', async () => {
      // Arrange
      const rulebooks = Array.from({ length: 15 }, (_, i) => ({
        name: `Rulebook ${i}`,
        description: `Description ${i}`,
      }));
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(rulebooks.slice(10, 15)),
      } as any);

      // Act
      const result = await service.findAll(1, 10);

      // Assert
      expect(result).toHaveLength(5);
      expect(model.find).toHaveBeenCalledWith({}, null, {
        skip: 10,
        limit: 10,
      });
      expect(result[0].name).toBe('Rulebook 10');
      expect(result[4].name).toBe('Rulebook 14');
    });
  });

  describe('getById', () => {
    it('should return a rulebook by ID', async () => {
      // Arrange
      const id = '123456789012';
      const rulebook = {
        name: 'Rulebook 1',
        description: 'Description 1',
      };
      jest.spyOn(model, 'findById').mockReturnValue({
        findById: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(rulebook),
      } as any);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(model.findById).toHaveBeenCalledWith(id);
      expect(result.name).toBe('Rulebook 1');
      expect(result.description).toBe('Description 1');
    });

    it('should throw an error if the rulebook does not exist', async () => {
      // Arrange
      const id = '123456789012';
      jest.spyOn(model, 'findById').mockReturnValue({
        findById: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      // Act and assert
      await expect(service.findOne(id)).rejects.toThrow();
      expect(model.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a rulebook', async () => {
      // Arrange
      const payload = {
        name: 'Rulebook 1',
        description: 'Description 1',
      };
      jest.spyOn(model, 'exists').mockResolvedValue(false as any);
      jest.spyOn(model, 'create').mockResolvedValue(payload as any);
      jest.spyOn(model, 'create').mockResolvedValue(payload as any);

      // Act
      const result = await service.create(payload);

      // Assert
      expect(result.name).toBe('Rulebook 1');
      expect(result.description).toBe('Description 1');
      expect(model.exists).toHaveBeenCalledWith({ name: 'Rulebook 1' });
      expect(model.create).toHaveBeenCalledWith(payload);
    });

    it('should throw an error if the rulebook already exists', async () => {
      // Arrange
      const payload = {
        name: 'Rulebook 1',
        description: 'Description 1',
      };
      jest.spyOn(model, 'exists').mockResolvedValue(true as any);

      // Act and assert
      await expect(service.create(payload)).rejects.toThrow();
      expect(model.exists).toHaveBeenCalledWith({ name: 'Rulebook 1' });
      expect(model.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a rulebook', async () => {
      // Arrange
      const id = '123456789012';
      const rulebook = {
        _id: id,
        name: 'Rulebook 1',
        description: 'Description 1',
      };
      const payload = {
        name: 'Rulebook 2',
        description: 'Description 2',
      };
      jest.spyOn(model, 'findById').mockReturnValue({
        findById: jest.fn().mockReturnThis(),
        exec: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        save: jest.fn().mockResolvedValue({
          ...rulebook,
          ...payload,
        }),
      } as any);

      // Act
      const result = await service.update(id, {
        name: 'Rulebook 2',
        description: 'Description 2',
      });

      // Assert
      expect(model.findById).toHaveBeenCalledWith(id);
      expect(result.name).toBe('Rulebook 2');
      expect(result.description).toBe('Description 2');
      expect(model.findById(id).set).toHaveBeenCalledWith({
        name: 'Rulebook 2',
        description: 'Description 2',
      });
    });

    it('should throw an error if the rulebook does not exist', async () => {
      // Arrange
      jest.spyOn(model, 'findById').mockReturnValue({
        findById: jest.fn().mockReturnValue(undefined),
      } as any);

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
