import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Button, Table } from 'antd';
import { useReactToPrint } from 'react-to-print';

const Reports = () => {
  const [doctors, setDoctors] = useState([]);
  // const dispatch = useDispatch();

  const [isPagination, setIsPagination] = useState(true);

  const componentRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      setIsPagination(true);
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      setIsPagination(false);
      setTimeout(() => {
        promiseResolveRef.current();
      }, 100);
    }
  }, [isPrinting]);



  // const getData = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.get('/api/user/get-all-approved-doctors', {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     });
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       setDoctors(response.data.data);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error('Something went wrong');
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const myList = [
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
  ];
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='page-title'>Reports</h1>
        <Button onClick={handlePrint} type='primary' danger>
          Export to PDF
        </Button>
      </div>
      <hr />

      <div ref={componentRef}>
        {myList && <Table columns={columns} dataSource={myList} pagination={isPagination} />}
      </div>
    </Layout>
  );
};

export default Reports;
