import {server} from '../server.js';
import request from 'supertest';
import prisma from "../config/prismaClient.js";

afterAll(async () => {
  server.close();
  await prisma.$disconnect();
});

describe("check server startup", () => {
  it("should return Http server is running", async() => {
    const response = await request(server).get("/");
    expect(response.body).toEqual({message:"Http server is running"});
  })
})

describe.skip("user registration", () => {
  describe("given the username and password are valid", () => {
    it("should return the user payload", () => {})
  })
})