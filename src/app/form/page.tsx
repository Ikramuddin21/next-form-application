/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { Button, Form, FormProps, Input, message, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { generateId } from "../../../helpers/generateId";
import { FieldType } from "../../../type/type";

const page = () => {
  const id = generateId();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // on finish
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const payload = {
      id,
      ...values,
    };

    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resData = await res.json();

    if (resData.success) {
      messageApi.open({
        type: "success",
        content: resData.message,
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: resData.message,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {contextHolder}
      <h1 className="text-2xl mb-4">Form field</h1>
      <Form
        form={form}
        style={{ width: 800 }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
        className="grid grid-cols-2 gap-6"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          className="!mb-0"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            placeholder="Enter Name"
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          className="!mb-0"
          rules={[
            {
              required: true,
              type: "email",
              message: "Enter a valid email address!",
            },
          ]}
        >
          <Input
            placeholder="Enter Email"
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          className="!mb-0"
          rules={[
            {
              required: true,
              message: "Enter valid phone number!",
            },
            {
              validator: (_, value) => {
                if (value.length !== 11) {
                  return Promise.reject(new Error("Only 11 number"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            placeholder="Enter phone"
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Skills"
          name="skills"
          className="!mb-0 [&_.ant-select-selector]:!border-0"
        >
          <Select
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
            mode="multiple"
            allowClear
            placeholder="Please select"
            // onChange={handleChange}
            options={[
              { value: "HTML", label: "HTML" },
              { value: "CSS", label: "CSS" },
              { value: "JavaScript", label: "JavaScript" },
              { value: "React.js", label: "React.js" },
              { value: "Next.js", label: "Next.js" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Experience"
          name="experience"
          className="!mb-0"
        >
          <Select
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
            allowClear
            placeholder="Please select"
            // onChange={handleChange}
            options={[
              { value: "Junior", label: "Junior" },
              { value: "Mid", label: "Mid" },
              { value: "Senior", label: "Senior" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Expected Salary"
          name="salary"
          className="!mb-0"
        >
          <Input
            type="number"
            placeholder="Enter Expected Salary"
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Employment Status"
          name="status"
          className="!mb-0"
          rules={[
            { required: true, message: "Please input your Employment Status!" },
          ]}
        >
          <Radio.Group
            name="status"
            options={[
              { value: "Employed", label: "Employed" },
              { value: "Unemployed", label: "Unemployed" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Introduction"
          name="introduction"
          className="!mb-0"
        >
          <TextArea
            className="w-full text-sm outline-0 border border-[#646cff] rounded"
            placeholder="Introduction"
            maxLength={500}
          />
        </Form.Item>

        <Form.Item label={null}>
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link href="/">
              <Button>Home</Button>
            </Link>
            <Link href="data">
              <Button>Data diaplay page</Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default page;
