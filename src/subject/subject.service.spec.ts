import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';

describe('SubjectService', () => {
  let service: SubjectService;

  let configService = {
    get: jest.fn(),
  };

  let cacheManager = {
    get: jest.fn(),
  };

  let subjectRepository = {
    // findOneById: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
        {
          provide: getRepositoryToken(SubjectEntity),
          useValue: subjectRepository,
        },
      ],
    }).compile();

    service = module.get(SubjectService);
  });

  describe('findOneById', () => {
    it('should retrieve subject from and id', async () => {
      const spySubjectRepository = jest
        // .spyOn(subjectRepository, 'findOneById')
        .spyOn(subjectRepository, 'findOneBy')
        .mockImplementation(() => ({
          id: 1,
          name: 'test-subject',
        }));

      const result = await service.findOneById(1);

      expect(spySubjectRepository).toHaveBeenCalledTimes(1);
      expect(spySubjectRepository).toHaveBeenCalledWith({ id: 1 });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });

    it('should throw error not found', async () => {
      jest.spyOn(subjectRepository, 'findOneBy').mockImplementation(() => null);

      await expect(service.findOneById(1)).rejects.toThrow(
        'no subject linked to id: 1',
      );
    });
  });
});
