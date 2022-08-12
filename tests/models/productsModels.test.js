const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../models/productModel");
const connection = require("../../models/connection");

describe("productModel.js", () => {
  describe("getAll no BD", () => {
    const products = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves([products]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna todos produtos corretos", async () => {
      const response = await productModel.getAll();
      expect(response).to.be.a("array");
      expect(response[0]).to.have.all.keys("id", "name");
      expect(response[0].id).to.be.eq(1);
      expect(response[0].name).to.be.eq("Martelo de Thor");
      expect(response[3]).to.be.eq(undefined);
    });
  });

  describe("getById no BD", () => {
    const product = [{ id: 1, name: "Martelo de Thor" }];

    before(() => {
      sinon.stub(connection, "execute").resolves([product]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna um produto correto", async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("id", "name");
      expect(response.id).to.be.eq(1);
      expect(response.name).to.be.eq("Martelo de Thor");
    });
  });

    describe("getByName no BD", () => {
    const product = [{ id: 1, name: "Martelo de Thor" }];

    before(() => {
      sinon.stub(connection, "execute").resolves([product]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna um produto correto", async () => {
      const response = await productModel.getByName('Martelo');
      expect(response).to.be.a("array");
      expect(response[0]).to.have.all.keys("id", "name");
      expect(response[0].id).to.be.eq(1);
      expect(response[0].name).to.be.eq("Martelo de Thor");
    });
  });

  describe("create no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna o produto criado", async () => {
      const response = await productModel.create({
        name: "Capa de Invisibildade",
      });
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("id", "name");
      expect(response.id).to.be.eq(4);
      expect(response.name).to.be.eq("Capa de Invisibildade");
    });
  });

  describe("update no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna o produto editado", async () => {
      const response = await productModel.update({
        id: 4,
        name: "Capa de Invisibildade",
      });
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("id", "name");
      expect(response.id).to.be.eq(4);
      expect(response.name).to.be.eq("Capa de Invisibildade");
    });
  });

  describe("exclude no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna o id do produto excluido", async () => {
      const response = await productModel.exclude(2);
      expect(response).to.be.eq(2);
    });
  });
});
