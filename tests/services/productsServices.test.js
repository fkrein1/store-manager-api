const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../models/productModel");
const productService = require("../../services/productService");

describe("productService.js", () => {
  describe("getAll sucesso", () => {
    const products = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    before(() => {
      sinon.stub(productModel, "getAll").resolves(products);
    });
    after(() => {
      productModel.getAll.restore();
    });

    it("retorna todos produtos corretos", async () => {
      const response = await productService.getAll();
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data[0]).to.have.all.keys("id", "name");
      expect(response.data[0].id).to.be.eq(1);
      expect(response.data[0].name).to.be.eq("Martelo de Thor");
      expect(response.data[3]).to.be.eq(undefined);
      expect(response.code).to.be.eq(200);
    });
  });

  describe("getAll falha", () => {
    before(() => {
      sinon.stub(productModel, "getAll").resolves();
    });
    after(() => {
      productModel.getAll.restore();
    });

    it("No erro retorna 404 e Product not found", async () => {
      const response = await productService.getAll();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Products not found");
      expect(response.code).to.be.eq(404);
    });
  });

  ///////
  describe("getById sucesso", () => {
    const product = { id: 1, name: "Martelo de Thor" };
    before(() => {
      sinon.stub(productModel, "getById").resolves(product);
    });
    after(() => {
      productModel.getById.restore();
    });

    it("retorna o produto correto", async () => {
      const response = await productService.getById();
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data).to.have.all.keys("id", "name");
      expect(response.data.id).to.be.eq(1);
      expect(response.data.name).to.be.eq("Martelo de Thor");
      expect(response.code).to.be.eq(200);
    });
  });

  describe("getById falha", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves();
    });
    after(() => {
      productModel.getById.restore();
    });

    it("No erro retorna 404 e Product not found", async () => {
      const response = await productService.getById();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Product not found");
      expect(response.code).to.be.eq(404);
    });
  });

  ///////
  describe("getByName sucesso", () => {
    const product = [{ id: 1, name: "Martelo de Thor" }];
    before(() => {
      sinon.stub(productModel, "getByName").resolves(product);
    });
    after(() => {
      productModel.getByName.restore();
    });

    it("retorna o produto correto", async () => {
      const response = await productService.getByName();
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data[0]).to.have.all.keys("id", "name");
      expect(response.data[0].id).to.be.eq(1);
      expect(response.data[0].name).to.be.eq("Martelo de Thor");
      expect(response.code).to.be.eq(200);
    });
  });

  describe("getByName falha", () => {
    before(() => {
      sinon.stub(productModel, "getByName").resolves();
    });
    after(() => {
      productModel.getByName.restore();
    });

    it("No erro retorna 404 e Product not found", async () => {
      const response = await productService.getByName();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Product not found");
      expect(response.code).to.be.eq(404);
    });
  });

  ///////
  describe("create sucesso", () => {
    const productInput = { name: "Capa Invisibilidade" };
    const productOutput = { id: 4, name: "Capa Invisibilidade" };

    before(() => {
      sinon.stub(productModel, "create").resolves(productOutput);
    });
    after(() => {
      productModel.create.restore();
    });

    it("retorna o produto correto", async () => {
      const response = await productService.create(productInput);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data).to.have.all.keys("id", "name");
      expect(response.data.id).to.be.eq(4);
      expect(response.data.name).to.be.eq("Capa Invisibilidade");
      expect(response.code).to.be.eq(201);
    });
  });

  describe("create falha name vazio", () => {
    before(() => {
      sinon.stub(productModel, "create").resolves();
    });
    after(() => {
      productModel.create.restore();
    });

    it("No erro retorna 400 e Name is required", async () => {
      const response = await productService.create({});
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq('"name" is required');
      expect(response.code).to.be.eq(400);
    });
  });

  describe("create falha name com 4 caracteres", () => {
    before(() => {
      sinon.stub(productModel, "create").resolves();
    });
    after(() => {
      productModel.create.restore();
    });

    it("No erro retorna 422 e Name deve ter pelo menos 5 caracteres", async () => {
      const response = await productService.create({ name: "caca" });
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq(
        '"name" length must be at least 5 characters long'
      );
      expect(response.code).to.be.eq(422);
    });
  });

  ///////
  describe("update sucesso", () => {
    const product = { id: 1, name: "Martelo dos Simpsons" };

    before(() => {
      sinon.stub(productModel, "getById").resolves(product);
      sinon.stub(productModel, "update").resolves(product);
    });
    after(() => {
      productModel.update.restore();
      productModel.getById.restore();
    });

    it("retorna o produto correto", async () => {
      const response = await productService.update(product);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data).to.have.all.keys("id", "name");
      expect(response.data.id).to.be.eq(1);
      expect(response.data.name).to.be.eq("Martelo dos Simpsons");
      expect(response.code).to.be.eq(200);
    });
  });

  describe("update falha, id não existe", () => {
    const product = { id: 99, name: "Capa Mágica" };

    before(() => {
      sinon.stub(productModel, "getById").resolves();
    });
    after(() => {
      productModel.getById.restore();
    });

    it("retorna 404 Product not found", async () => {
      const response = await productService.update(product);
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Product not found");
      expect(response.code).to.be.eq(404);
    });
  });

  describe("update falha name vazio", () => {
    before(() => {
      sinon.stub(productModel, "update").resolves();
    });
    after(() => {
      productModel.update.restore();
    });

    it("No erro retorna 400 e Name is required", async () => {
      const response = await productService.update({});
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq('"name" is required');
      expect(response.code).to.be.eq(400);
    });
  });

  describe("update falha name com 4 caracteres", () => {
    before(() => {
      sinon.stub(productModel, "update").resolves();
    });
    after(() => {
      productModel.update.restore();
    });

    it("No erro retorna 422 e Name deve ter pelo menos 5 caracteres", async () => {
      const response = await productService.update({ name: "caca" });
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq(
        '"name" length must be at least 5 characters long'
      );
      expect(response.code).to.be.eq(422);
    });
  });

  ///////
  describe("exclude sucesso", () => {
    const product = { id: 1, name: "Martelo do Thor" };

    before(() => {
      sinon.stub(productModel, "getById").resolves(product);
      sinon.stub(productModel, "exclude").resolves(product);
    });
    after(() => {
      productModel.exclude.restore();
      productModel.getById.restore();
    });

    it("retorna 204 produto deletado", async () => {
      const response = await productService.exclude(1);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data.message).to.be.eq("Product id 1 was deleted");
      expect(response.code).to.be.eq(204);
    });
  });

  describe("exclude falha, id não existe", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves();
    });
    after(() => {
      productModel.getById.restore();
    });

    it("retorna 404 Product not found", async () => {
      const response = await productService.exclude();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Product not found");
      expect(response.code).to.be.eq(404);
    });
  });
});
