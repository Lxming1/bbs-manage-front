import { Breadcrumb, Button, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { memo } from 'react'

export default memo(
  ({ breadcrumbList, columns, data, headerContent, reqFn, noPage = false, children }) => {
    return (
      <>
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}>
          {breadcrumbList.map((item, index) => (
            <Breadcrumb.Item key={index} href={item?.href}>
              {typeof item === 'string' ? item : item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: 'white',
          }}>
          {headerContent}
          {!children ? (
            <Table
              columns={columns}
              dataSource={data?.list}
              style={{ minWidth: '100%' }}
              bordered
              pagination={
                !noPage && {
                  position: ['bottomCenter'],
                  onChange: (pagenum, pagesize) => {
                    reqFn(pagenum, pagesize)
                  },
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                  total: data?.total,
                  showTotal: (total) => (
                    <span
                      style={{ marginRight: '10px', lineHeight: '32px' }}>{`共${total}条`}</span>
                  ),
                  hideOnSinglePage: true,
                }
              }
            />
          ) : (
            children
          )}
        </Content>
      </>
    )
  }
)
