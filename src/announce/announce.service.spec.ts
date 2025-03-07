import { Test } from '@nestjs/testing';
import { AnnounceService } from './announce.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { SubjectService } from 'src/subject/subject.service';
import { LevelService } from 'src/level/level.service';
import { Role } from 'src/user/interface/role';
import { UserService } from 'src/user/user.service';

describe('AnnounceService', () => {
  let service: AnnounceService;
  let subjectService = {
    findOneByName: jest.fn(),
  };
  let levelService = {
    findOneByName: jest.fn(),
  };
  let userService = {
    findOneById: jest.fn(),
  };
  let repository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(AnnounceEntity),
          useValue: repository,
        },
      ],
    })
      .useMocker((token) => {
        if (token === SubjectService) {
          return subjectService;
        }
        if (token === LevelService) {
          return levelService;
        }
        if (token === UserService) {
          return userService;
        }
      })
      .compile();

    service = module.get<AnnounceService>(AnnounceService);
  });

  describe('createAnnounce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');

    const spySubject = jest.spyOn(subjectService, 'findOneByName');

    const spyRepository = jest.spyOn(repository, 'save');

    const spyUser = jest.spyOn(userService, 'findOneById');

    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
      userId: 2,
    };

    it('should create an announce', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });

      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

      spyUser.mockResolvedValue({
        id: 2,
        firstName: 'test',
        lastName: 'test',
        role: Role.Teacher,
      });

      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
        teacher: {
          id: 2,
          firstName: 'test',
          lastName: 'test',
          role: Role.Teacher,
        },
      });

      const result = await service.createAnnounce(announceToCreate);

      expect(result).toStrictEqual({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
        teacher: {
          id: 2,
          firstName: 'test',
          lastName: 'test',
          role: Role.Teacher,
        },
      });

      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
        teacher: {
          id: 2,
          firstName: 'test',
          lastName: 'test',
          role: Role.Teacher,
        },
      });
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });

    it('should not create an announce if level is empty', async () => {
      spyLevel.mockResolvedValue(null);

      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'level not found',
      );
    });

    it('should not create an announce if subject is empty', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'level-subject',
      });

      spySubject.mockResolvedValue(null);

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'subject not found',
      );
    });
  });

  describe('searchAnnounce', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });

    const spyLevel = jest.spyOn(levelService, 'findOneByName');

    const spySubject = jest.spyOn(subjectService, 'findOneByName');

    const spyRepository = jest.spyOn(repository, 'findOneBy');

    const searchAnnounce = {
      subjectName: 'test-subject',
      levelName: 'test-level',
    };

    it('should find announce', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });

      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });

      const result = await service.searchAnnounce(searchAnnounce);

      expect(result).toStrictEqual({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });

      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
    });

    it('should send an error if announce not found', async () => {
      spyRepository.mockResolvedValue(null);

      await expect(service.searchAnnounce(searchAnnounce)).rejects.toThrow(
        'no announce linked to subject: test-subject and level: test-level',
      );
    });
  });
});
