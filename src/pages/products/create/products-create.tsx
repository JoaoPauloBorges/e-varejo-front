import React, { FC, useEffect, useState } from "react";
import ImageUploader from "components/imageUploader/imageUploader";
import {
  Button,
  Skeleton,
  Steps,
  Form,
  Input,
  notification,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { CreateProductDto } from "./dto/create-product.dto";
import api from "services/api";
import { Product } from "./models/product";
import { Link } from "react-router-dom";

const { Step } = Steps;
const ProductsCreate: FC = () => {
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState({} as Product);
  const [savingProduct, setSavingProduct] = useState(false);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const step1 = (
    <Skeleton loading={false} active>
      <div
        style={{
          padding: "20px 50px",
          width: "100%",
          border: "2px solid #B8B8B8",
          borderRadius: "8px",
        }}
      >
        <Form.Item
          name="productName"
          label="Produto"
          rules={[{ required: true, message: "Nome é obrigatório" }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: "Descrição é obrigatória" }]}
        >
          <Input placeholder="Descrição" />
        </Form.Item>

        <Form.Item
          name="value"
          label="Valor"
          rules={[{ required: true, message: "valor é obrigatória" }]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item name="discount" label="Desconto">
          <Input type="number" min={0} />
        </Form.Item>
      </div>
    </Skeleton>
  );

  const step2 = (
    <Skeleton loading={false} active>
      <ImageUploader IdProduct={product.id} />
    </Skeleton>
  );

  const steps = [
    {
      title: "Cadastro Produto",
      content: step1,
    },
    {
      title: "Cadastro Imagens",
      content: step2,
    },
  ];

  useEffect(() => {
    forceUpdate({});
  }, []);

  const saveProduct = async () => {
    try {
      setSavingProduct(true);
      const body = {
        productName: form.getFieldValue("productName"),
        description: form.getFieldValue("description"),
        value: Number(form.getFieldValue("value")),
        discount: Number(form.getFieldValue("discount")),
      } as CreateProductDto;

      const { data } = await api.post("/products", body);
      setProduct(data);

      notification.success({
        message: "Sucesso",
        description: "Produto cadastrado",
      });
      setCurrent(current + 1);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Algo de errado aconteceu",
        description: "Não foi possível salvar o produto",
      });
    } finally {
      setSavingProduct(false);
    }
  };

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Content style={{ margin: "3% auto", width: "100%" }}>
        <Form
          style={{ width: "100%" }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          name="form"
          size="large"
        >
          <div className="steps-content" style={{ margin: "20px auto" }}>
            {steps[current].content}
          </div>

          <div className="steps-action">
            {current < steps.length - 1 && (
              <>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      loading={savingProduct}
                      disabled={
                        !(
                          form.isFieldsTouched(["value"]) &&
                          form.isFieldsTouched(["productName"]) &&
                          form.isFieldsTouched(["description"])
                        ) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                      onClick={saveProduct}
                    >
                      Próximo
                    </Button>
                  )}
                </Form.Item>
              </>
            )}

            {current === steps.length - 1 && (
              <Link to="/products">
                <Button type="primary">Done</Button>
              </Link>
            )}
          </div>
        </Form>
      </Content>
    </>
  );
};

export default ProductsCreate;
