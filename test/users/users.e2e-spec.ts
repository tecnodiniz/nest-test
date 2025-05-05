import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  it('/users (GET) should return all users', async () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .expect([{ id: 1, name: 'Admin' }]);
  });

  it('/users/:id (GET) should return an specific user', async () => {
    return request(app.getHttpServer())
      .get('/api/users/1')
      .expect(200)
      .expect({ id: 1, name: 'Admin' });
  });

  it('/users/:id (GET) should return not found', async () => {
    return await request(app.getHttpServer()).get('/api/users/10').expect(404);
  });
});
