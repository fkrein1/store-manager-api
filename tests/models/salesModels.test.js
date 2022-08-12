const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../models/salesModel");
const connection = require("../../models/connection");

describe("salesModel.js", () => {
  describe("getAll no BD", () => {
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
      sinon.stub(connection, "execute").resolves([sales]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna todas as vendas corretas", async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.a("array");
      expect(response[0]).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
      expect(response[0].saleId).to.be.eq(1);
      expect(response[1].quantity).to.be.eq(10);
      expect(response[3]).to.be.eq(undefined);
    });
  });

  //////////
  describe("getById no BD", () => {
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
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves([sales]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna os dados da vendas", async () => {
      const response = await salesModel.getById();
      expect(response).to.be.a("array");
      expect(response[0]).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
      expect(response[0].saleId).to.be.eq(1);
      expect(response[1].quantity).to.be.eq(10);
      expect(response[2]).to.be.eq(undefined);
    });
  });

  //////////
  describe("createSale no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna o id da venda criada", async () => {
      const response = await salesModel.createSale();
      expect(response).to.have.eq(5);
    });
  });
  
  //////////
  describe("createSaleAndProduct no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna true se a quantidade e produtos adiciona a venda", async () => {
      const response = await salesModel.createSaleAndProduct();
      expect(response).to.be.eq(true);
    });
  });

  //////////
  describe("update no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna true se venda atualizada", async () => {
      const response = await salesModel.update();
      expect(response).to.be.eq(true);
    });
  });

  //////////
  describe("exclude no BD", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });
    after(() => {
      connection.execute.restore();
    });

    it("retorna o id da venda excluida", async () => {
      const response = await salesModel.exclude(3);
      expect(response).to.be.eq(3);
    });
  });
});
