import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, notification, Space, Table } from "antd";
import api from "services/api";
import { PageableContent } from "interfaces/pageable-content";
import { Product } from "../create/models/product";

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
          <p>
            <b style={{ color: "black" }}>{entry.productName}</b>
          </p>
          <p style={{ color: "gray" }}>{entry.description}</p>
        </>
      ),
    },
    {
      dataIndex: "value",
      key: "valor",
      render: (_: any, entry: Product) => (
        <p style={{ color: "gray" }}>
          {!!entry.discount && entry.discount !== 0 && (
            <>
              <s>{fmt.format(entry.discount)}</s> por{" "}
            </>
          )}
          <b style={{ color: "black" }}>{fmt.format(entry.value)}</b>
        </p>
      ),
    },
  ];

  const fetchData = async (page = 1, size = 10) => {
    try {
      setLoading(true);

      const params = { search: location.search.split("q=")?.[1] };

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
        description: "não foi possível carregar a lista de produtos",
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
        title={(data) => {
          const plural = data.length > 1 || data.length === 0;
          return (
            <p>
              {data.length} PRODUTO{plural ? "S" : ""} ENCONTRADO
              {plural ? "S" : ""}
            </p>
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
