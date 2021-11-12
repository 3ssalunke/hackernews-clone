import { passwordIterations } from "../../src/config";
import { createHash, createSalt } from "../../src/helpers/hash-password";
import { UserModel } from "../../src/model/user.model";
import { validateNewUser } from "../../src/model/user.validator";
import { HnCache } from "../database/cache";
import { HnDatabase } from "../database/database";

export class UserService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getUser(id: string): Promise<UserModel | void> {
    return this.cache.getUser(id);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = this.cache.getUser(id);
    if (user) {
      return (
        (await createHash(password, user.passwordSalt!, passwordIterations)) ===
        user.hashedPassword
      );
    }
    return false;
  }

  async registerUser(user: {
    id: string;
    password: string;
  }): Promise<UserModel> {
    validateNewUser(user);
    if (this.cache.getUser(user.id)) {
      throw new Error("Username is taken.");
    }

    const passwordSalt = createSalt();
    const hashedPassword = await createHash(
      user.password,
      passwordSalt,
      passwordIterations
    );

    const newUser = new UserModel({
      hashedPassword,
      id: user.id,
      passwordSalt,
    });
    console.log("user", newUser);
    this.cache.setuser(user.id, newUser);
    return newUser;
  }
}
