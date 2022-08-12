const { expect } = require("chai");
const sinon = require("sinon");

const salesController = require("../../controllers/salesController");
const salesService = require("../../services/salesService");

describe("salesController.js", () => {
  describe("getAll sucesso", () => {
    const result = {
      data: [
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
      ],
      code: 200,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getAll").resolves(result);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it("retorna status 200 e json com os produtos", async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe("getAll falha", () => {
    const result = {
      error: { message: "Sale not found" },
      code: 404,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getAll").resolves(result);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it("retorna status 404 e json com o erro", async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(result.error)).to.be.equal(true);
    });
  });
  /////////
  describe("getById sucesso", () => {
    const result = {
      data: [
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
      ],
      code: 200,
    };

    const res = {};
    const req = {};

    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getById").resolves(result);
    });

    after(() => {
      salesService.getById.restore();
    });

    it("retorna status 200 e json com o produto", async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe("getById falha", () => {
    const result = {
      error: { message: "Sale not found" },
      code: 404,
    };

    const res = {};
    const req = {};

    before(() => {
      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getById").resolves(result);
    });

    after(() => {
      salesService.getById.restore();
    });

    it("retorna status 404 e json com o erro", async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(result.error)).to.be.equal(true);
    });
  });

  /////////
  describe("create sucesso", () => {
    const result = {
      data: {
        id: 5,
        itemsSold: [
          { productId: 3, quantity: 25 },
          { productId: 2, quantity: 10 },
        ],
      },
      code: 201,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "create").resolves(result);
    });

    after(() => {
      salesService.create.restore();
    });

    it("retorna status 201 e json com id venda e produtos", async () => {
      await salesController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe("create falha", () => {
    const result = {
      error: { message: '"productId" is required' },
      code: 400,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "create").resolves(result);
    });

    after(() => {
      salesService.create.restore();
    });

    it("retorna status 400 e json com o erro", async () => {
      await salesController.create(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith(result.error)).to.be.equal(true);
    });
  });

   /////////
  describe("update sucesso", () => {
    const result = {
      data: {
        id: 5,
        itemsUpdated: [
          { productId: 3, quantity: 20 },
          { productId: 2, quantity: 5 },
        ],
      },
      code: 200,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "update").resolves(result);
    });

    after(() => {
      salesService.update.restore();
    });

    it("retorna status 201 e json com os produtos atualizados", async () => {
      await salesController.update(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe("update falha", () => {
    const result = {
      error: { message: '"productId" is required' },
      code: 400,
    };

    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "update").resolves(result);
    });

    after(() => {
      salesService.update.restore();
    });

    it("retorna status 400 e json com o erro", async () => {
      await salesController.update(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith(result.error)).to.be.equal(true);
    });
  });

    /////////
  describe("exclude sucesso", () => {
    const result = {
      data: { message: 'Product id 3 was deleted' },
      code: 204,
    };

    const res = {};
    const req = {};

    before(() => {
      req.params = { id: 3}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "exclude").resolves(result);
    });

    after(() => {
      salesService.exclude.restore();
    });

    it("retorna status 204 e json com mensagem do produto excluído", async () => {
      await salesController.exclude(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe("exclude falha", () => {
    const result = {
      error: { message: 'Sale not found' },
      code: 404,
    };

    const res = {};
    const req = {};

    before(() => {
      req.params = { id: 3}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "exclude").resolves(result);
    });

    after(() => {
      salesService.exclude.restore();
    });

    it("retorna status 404 e json com o erro de venda não encontrada", async () => {
      await salesController.exclude(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(result.error)).to.be.equal(true);
    });
  });

});
