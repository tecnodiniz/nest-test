import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // GET
  it('should return all users', () => {
    const users = service.listAll();
    expect(users).toEqual([{ id: 1, name: 'Admin' }]);
  });

  it('should return a specific user', () => {
    const users = service.getUser(1);
    expect(users).toEqual({ id: 1, name: 'Admin' });
  });

  it('should throw NotFoundException if user not found on getUser', () => {
    return expect(() => service.getUser(999)).toThrow(NotFoundException);
  });

  // POST
  it('should create a new user', () => {
    const user = service.create('Eduardo');
    expect(user).toHaveProperty('id');

    const users = service.listAll();
    expect(users).toContainEqual(user);
  });

  // DELETE
  it('should remove a user', () => {
    const user = service.create('Eduardo');

    service.remove(user.id);
    const users = service.listAll();
    expect(users.find((u) => u.id === user.id)).toBe(undefined);
  });

  it('should throw NotFoundException if user not found on remove', () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
