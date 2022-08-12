const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../models/salesModel");
const productModel = require("../../models/productModel");
const salesService = require("../../services/salesService");

describe("salesService.js", () => {
  describe("getAll sucesso", () => {
    const sales = [
      {
        saleId: 1,
        date: 2022 - 08 - 12,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: 2022 - 08 - 12,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: 2022 - 08 - 12,
        productId: 3,
        quantity: 15,
      },
    ];

    before(() => {
      sinon.stub(salesModel, "getAll").resolves(sales);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it("retorna as vendas corretas", async () => {
      const response = await salesService.getAll();
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data[0]).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
      expect(response.data[0].saleId).to.be.eq(1);
      expect(response.data[1].quantity).to.be.eq(10);
      expect(response.code).to.be.eq(200);
    });
  });

  describe("getAll falha", () => {
    before(() => {
      sinon.stub(salesModel, "getAll").resolves();
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it("No erro retorna 404 e Sale not found", async () => {
      const response = await salesService.getAll();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Sale not found");
      expect(response.code).to.be.eq(404);
    });
  });

  /////////////
  describe("getById sucesso", () => {
    const sale = [
      {
        saleId: 1,
        date: 2022 - 08 - 12,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: 2022 - 08 - 12,
        productId: 2,
        quantity: 10,
      },
    ];

    before(() => {
      sinon.stub(salesModel, "getById").resolves(sale);
    });
    after(() => {
      salesModel.getById.restore();
    });

    it("retorna a vendas correta", async () => {
      const response = await salesService.getById();
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data[0]).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
      expect(response.data[0].saleId).to.be.eq(1);
      expect(response.data[1].quantity).to.be.eq(10);
      expect(response.code).to.be.eq(200);
    });
  });

  describe("getById falha", () => {
    before(() => {
      sinon.stub(salesModel, "getById").resolves();
    });
    after(() => {
      salesModel.getById.restore();
    });

    it("No erro retorna 404 e Sale not found", async () => {
      const response = await salesService.getById();
      expect(response).to.have.all.keys("error", "code");
      expect(response.error).to.be.a("object");
      expect(response.error.message).to.be.eq("Sale not found");
      expect(response.code).to.be.eq(404);
    });
  });

  /////////////
  describe("create sucesso", () => {
    const sale = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves(true);
      sinon.stub(salesModel, "createSale").resolves(5);
      sinon.stub(salesModel, "createSaleAndProduct").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.createSale.restore();
      salesModel.createSaleAndProduct.restore();
    });

    it("retorna a venda criada", async () => {
      const response = await salesService.create(sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data).to.have.all.keys("id", "itemsSold");
      expect(response.data.id).to.be.eq(5);
      expect(response.data.itemsSold[0]).to.have.all.keys(
        "productId",
        "quantity"
      );
      expect(response.data.itemsSold[0].productId).to.be.eq(1);
      expect(response.data.itemsSold[0].quantity).to.be.eq(5);
      expect(response.code).to.be.eq(201);
    });
  });

  /////////////
  describe("create falha", () => {
    const sale = [
      { productId: 1, quantiy: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves();
      sinon.stub(salesModel, "createSale").resolves();
      sinon.stub(salesModel, "createSaleAndProduct").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.createSale.restore();
      salesModel.createSaleAndProduct.restore();
    });

    it("erro 400 se chave quantity não existe em todos os itens da requisição", async () => {
      const response = await salesService.create(sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq('"quantity" is required');
      expect(response.code).to.be.eq(400);
    });
  });

  /////////////
  describe("create falha", () => {
    const sale = [
      { product: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves();
      sinon.stub(salesModel, "createSale").resolves();
      sinon.stub(salesModel, "createSaleAndProduct").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.createSale.restore();
      salesModel.createSaleAndProduct.restore();
    });

    it("erro 400 se chave productId não existe em todos os itens da requisição", async () => {
      const response = await salesService.create(sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq('"productId" is required');
      expect(response.code).to.be.eq(400);
    });
  });

  /////////////
  describe("create falha", () => {
    const sale = [
      { productId: 1, quantity: 0 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves();
      sinon.stub(salesModel, "createSale").resolves();
      sinon.stub(salesModel, "createSaleAndProduct").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.createSale.restore();
      salesModel.createSaleAndProduct.restore();
    });

    it("erro 422 alguma quantidade menor que 1", async () => {
      const response = await salesService.create(sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq(
        '"quantity" must be greater than or equal to 1'
      );
      expect(response.code).to.be.eq(422);
    });
  });

  /////////////
  describe("create falha", () => {
    const sale = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves(undefined);
      sinon.stub(salesModel, "createSale").resolves();
      sinon.stub(salesModel, "createSaleAndProduct").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.createSale.restore();
      salesModel.createSaleAndProduct.restore();
    });

    it("erro 404 se o produto não existe", async () => {
      const response = await salesService.create(sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq("Product not found");
      expect(response.code).to.be.eq(404);
    });
  });

  /////////////
  describe("update sucesso", () => {
    const sale = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves(true);
      sinon.stub(salesModel, "getById").resolves(true);
      sinon.stub(salesModel, "update").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.getById.restore();
      salesModel.update.restore();
    });

    it("retorna a venda atualizada", async () => {
      const response = await salesService.update({ id: 3 }, sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data).to.have.all.keys("saleId", "itemsUpdated");
      expect(response.data.saleId).to.be.eq(3);
      expect(response.data.itemsUpdated[0]).to.have.all.keys(
        "productId",
        "quantity"
      );
      expect(response.data.itemsUpdated[0].productId).to.be.eq(1);
      expect(response.data.itemsUpdated[0].quantity).to.be.eq(5);
      expect(response.code).to.be.eq(200);
    });
  });

  /////////////
  describe("update falha", () => {
    const sale = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves(true);
      sinon.stub(salesModel, "getById").resolves(false);
      sinon.stub(salesModel, "update").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.getById.restore();
      salesModel.update.restore();
    });

    it("retorna 404 venda para atualizar não existe", async () => {
      const response = await salesService.update({ id: 99 }, sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq("Sale not found");
      expect(response.code).to.be.eq(404);
    });
  });

    /////////////
  describe("update falha", () => {
    const sale = [
      { produtId: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves();
      sinon.stub(salesModel, "getById").resolves();
      sinon.stub(salesModel, "update").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.getById.restore();
      salesModel.update.restore();
    });

    it("retorna 400 e falta producId em algum item do array", async () => {
      const response = await salesService.update({ id: 2 }, sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq('"productId" is required');
      expect(response.code).to.be.eq(400);
    });
  });

  describe("update falha", () => {
    const sale = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(productModel, "getById").resolves(undefined);
      sinon.stub(salesModel, "getById").resolves();
      sinon.stub(salesModel, "update").resolves();
    });
    after(() => {
      productModel.getById.restore();
      salesModel.getById.restore();
      salesModel.update.restore();
    });

    it("retorna 404 e produto não encontrado", async () => {
      const response = await salesService.update({ id: 2 }, sale);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq('Product not found');
      expect(response.code).to.be.eq(404);
    });
  });
  /////////////
  describe("exclude sucesso", () => {
    before(() => {
      sinon.stub(salesModel, "getById").resolves(true);
      sinon.stub(salesModel, "exclude").resolves();
    });
    after(() => {
      salesModel.getById.restore();
      salesModel.exclude.restore();
    });
    it("retorna 404 e mensagem de confirmação", async () => {
      const response = await salesService.exclude(5);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("data", "code");
      expect(response.data.message).to.be.eq("Product id 5 was deleted");
      expect(response.code).to.be.eq(204);
    });
  });

  /////////////
  describe("exclude falha", () => {
    before(() => {
      sinon.stub(salesModel, "getById").resolves(false);
      sinon.stub(salesModel, "exclude").resolves();
    });
    after(() => {
      salesModel.getById.restore();
      salesModel.exclude.restore();
    });
    it("retorna 404 e mensagem de confirmação", async () => {
      const response = await salesService.exclude(99);
      expect(response).to.be.a("object");
      expect(response).to.have.all.keys("error", "code");
      expect(response.error.message).to.be.eq("Sale not found");
      expect(response.code).to.be.eq(404);
    });
  });
});
