import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private usuarios = [{ id: 1, name: 'Admin' }];

  listAll() {
    return this.usuarios;
  }

  getUser(id: number) {
    const user = this.usuarios.filter((u) => u.id == id)[0];

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  create(name: string) {
    const newUser = { id: Date.now(), name };
    this.usuarios.push(newUser);
    return newUser;
  }

  remove(id: number) {
    const user = this.usuarios.some((u) => u.id == id);

    if (!user) {
      throw new NotFoundException();
    }
    this.usuarios = this.usuarios.filter((u) => u.id != id);
  }
}
