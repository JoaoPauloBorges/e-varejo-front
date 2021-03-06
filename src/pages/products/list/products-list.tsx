import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, notification, Space, Table } from "antd";

import api from "services/api";
import { PageableContent } from "interfaces/pageable-content";
import { Product } from "../create/models/product";
import { CounterProducts, ProductDescription } from "./style";

const ProductsList: FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState(Array());
  const [loading, setLoading] = useState(false);
  const [pager, setPager] = useState({ current: 1, pageSize: 10, total: 0 });

  const fmt = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const columns = [
    {
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => (
        <Space>
          <Avatar shape="square" src={images[0]} size={64} />
          <Avatar shape="square" src={images[1]} size={64} />
          <Avatar shape="square" src={images[2]} size={64} />
          <Avatar shape="square" src={images[3]} size={64} />
        </Space>
      ),
    },
    {
      dataIndex: "description",
      key: "description",
      render: (_: any, entry: Product) => (
        <>
          <ProductDescription>
            <b style={{ color: "black" }}> {entry.productName}</b>
          </ProductDescription>
          <ProductDescription style={{ color: "gray", display: "contents" }}>
            {entry.description}
          </ProductDescription>
        </>
      ),
      ellipsis: true,
    },
    {
      dataIndex: "value",
      key: "valor",
      render: (_: any, entry: Product) => (
        <p style={{ color: "gray" }}>
          {!!entry.discount && entry.discount !== 0 && (
            <>
              <s>{fmt.format(entry.value)}</s> por{" "}
            </>
          )}
          <b style={{ color: "black" }}>
            {fmt.format(entry.value - entry.discount)}
          </b>
        </p>
      ),
    },
  ];

  const fetchData = async (page = 1, size = 10) => {
    try {
      setLoading(true);

      const params = {
        page,
        size,
        search: location.search.split("q=")?.[1],
      };

      const { data: resp } = await api.get<PageableContent>("products", {
        params,
      });

      const temp = resp.content.map((entry: any) => ({
        key: entry.id,
        ...entry,
      }));
      setProducts(temp);
      setPager({
        current: resp.page,
        pageSize: resp.size,
        total: resp.total,
      });
    } catch (e) {
      console.log(e);
      notification.error({
        message: "Algo deu errado",
        description: "n??o foi poss??vel carregar a lista de produtos",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <>
      <Table
        title={() => {
          const plural = pager.total > 1 || pager.total === 0;
          return (
            <CounterProducts>
              {pager.total} PRODUTO{plural ? "S" : ""} ENCONTRADO
              {plural ? "S" : ""}
            </CounterProducts>
          );
        }}
        dataSource={products}
        showHeader={false}
        columns={columns}
        loading={loading}
        pagination={{
          ...pager,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        size="large"
        onChange={(pagination) =>
          fetchData(pagination.current, pagination.pageSize)
        }
      />
    </>
  );
};

export default ProductsList;
