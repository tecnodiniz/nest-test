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

  it('/users (POST) should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send({ name: 'Eduardo' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Eduardo');
  });

  it('should return an error when given an invalid body on POST /users', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send({ nome: 'Eduardo' })
      .expect(400);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toEqual([
      'name must be longer than or equal to 3 characters',
      'name must be a string',
    ]);
  });

  it('should return an error when given an empty body.name on POST /users', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send({ name: '' })
      .expect(400);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toEqual([
      'name must be longer than or equal to 3 characters',
    ]);
  });
});
