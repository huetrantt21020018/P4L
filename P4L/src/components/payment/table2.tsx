import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Switch} from 'antd';
import type { FormInstance } from 'antd/es/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  price: number;
  quantity: number;
  into_money: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  into_money: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Cart: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "1",
      name: "Cây cam",
      price: 130000,
      quantity: 1,
      into_money: 130000
    },
    {
      key: "2",
      name: "Cây táo",
      price: 150000,
      quantity: 1,
      into_money: 150000
    },
    {
      key: "3",
      name: "Cây quýt",
      price: 140000,
      quantity: 1,
      into_money: 140000
    },
    {
      key: "4",
      name: "Cây bưởi",
      price: 120000,
      quantity: 1,
      into_money: 120000
    }
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      // render: (text) => <a href="#">{text}</a>
    },
    {
      title: "Đơn giá",
      dataIndex: "price"
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Thành tiền",
      dataIndex: "into_money"
    },
    {
      title: 'Xoá',
      dataIndex: 'operation',
      render: (_,record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Chắc chắn xoá?" onConfirm={() => handleDelete(record.key)}>
            {/* <a>Xoá</a> */}
            <svg className="h-5 w-5 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          </Popconfirm>
        ) : null,
    },
  ];

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        rowSelection={
          {
                type: 'checkbox',
                columnWidth: 48,
              }
        }
      />
    </div>
  );
};

export default Cart;